import { firebaseConfig, livePilotConfig } from "./firebase-config.js";

const FIREBASE_VERSION = "12.14.0";
const SDK_ROOT = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;

let servicesPromise;

function hasFirebaseConfig() {
  return Boolean(
    livePilotConfig.enabled &&
      firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.appId,
  );
}

async function services() {
  if (!hasFirebaseConfig()) {
    throw new Error("Tryb pilotażowy Firebase nie został jeszcze skonfigurowany.");
  }
  if (!servicesPromise) {
    servicesPromise = Promise.all([
      import(`${SDK_ROOT}/firebase-app.js`),
      import(`${SDK_ROOT}/firebase-auth.js`),
      import(`${SDK_ROOT}/firebase-firestore.js`),
      import(`${SDK_ROOT}/firebase-storage.js`),
      import(`${SDK_ROOT}/firebase-messaging.js`),
    ]).then(([appSdk, authSdk, firestoreSdk, storageSdk, messagingSdk]) => {
      const app = appSdk.initializeApp(firebaseConfig);
      const auth = authSdk.getAuth(app);
      authSdk.setPersistence(auth, authSdk.browserLocalPersistence);
      return {
        app,
        auth,
        authSdk,
        db: firestoreSdk.initializeFirestore(app, {
          ignoreUndefinedProperties: true,
        }),
        firestoreSdk,
        storage: storageSdk.getStorage(app),
        storageSdk,
        messagingSdk,
      };
    });
  }
  return servicesPromise;
}

function studioStateReference(api) {
  return api.firestoreSdk.doc(api.db, "studios", livePilotConfig.studioId);
}

function instructorAccessReference(api) {
  return api.firestoreSdk.doc(api.db, "access", "instructors");
}

function normalizedInstructorEmails(emails = []) {
  return [...new Set(emails.map((email) => email.trim().toLowerCase()).filter(Boolean))];
}

function cleanFileName(name = "zdjecie.jpg") {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function deviceId() {
  const key = "malina-live-device-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function mergePrimitiveArray(existing = [], incoming = []) {
  return [...new Set([...(existing || []), ...(incoming || [])])];
}

function mergeArrayById(existing = [], incoming = []) {
  const merged = new Map();
  [...(existing || []), ...(incoming || [])].forEach((entry, index) => {
    if (!entry) return;
    const key = entry.id ?? `${entry.type || "entry"}-${entry.createdAt || index}`;
    merged.set(String(key), entry);
  });
  return [...merged.values()];
}

function mergeItems(existing = [], incoming = [], deletedIds = new Set()) {
  const merged = new Map();
  [...(existing || []), ...(incoming || [])].forEach((item) => {
    if (!item?.id || deletedIds.has(String(item.id))) return;
    merged.set(String(item.id), item);
  });
  return [...merged.values()];
}

function mergeMaterialOptions(existing = {}, incoming = {}) {
  const categories = ["clay", "glazes", "paints", "temperature"];
  return Object.fromEntries(
    categories.map((category) => [
      category,
      mergePrimitiveArray(existing?.[category] || [], incoming?.[category] || []),
    ]),
  );
}

function mergeStudioState(existing = {}, incoming = {}) {
  const deletedItemIds = mergePrimitiveArray(
    existing.deletedItemIds || [],
    incoming.deletedItemIds || [],
  ).filter((id) => id !== undefined && id !== null);
  const deletedIds = new Set(deletedItemIds.map(String));

  return {
    ...existing,
    ...incoming,
    deletedItemIds: deletedItemIds.slice(-1000),
    items: mergeItems(existing.items || [], incoming.items || [], deletedIds),
    payments: mergeArrayById(existing.payments || [], incoming.payments || []),
    emailEvents: mergeArrayById(existing.emailEvents || [], incoming.emailEvents || []),
    notifications: mergeArrayById(
      existing.notifications || [],
      incoming.notifications || [],
    )
      .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0))
      .slice(0, 100),
    customMaterialOptions: mergeMaterialOptions(
      existing.customMaterialOptions || {},
      incoming.customMaterialOptions || {},
    ),
  };
}

export const liveBackend = {
  isConfigured: hasFirebaseConfig,

  async observeAuth(callback, onError) {
    const api = await services();
    return api.authSdk.onAuthStateChanged(api.auth, callback, onError);
  },

  async signIn(email, password) {
    const api = await services();
    const credential = await api.authSdk.signInWithEmailAndPassword(api.auth, email, password);
    const signedInEmail = credential.user.email?.toLowerCase() || "";
    const bootstrapEmails = normalizedInstructorEmails(livePilotConfig.instructorEmails);
    let hasAccess = bootstrapEmails.includes(signedInEmail);
    try {
      const accessSnapshot = await api.firestoreSdk.getDoc(instructorAccessReference(api));
      const configuredEmails = normalizedInstructorEmails(accessSnapshot.data()?.emails);
      hasAccess ||= configuredEmails.includes(signedInEmail);
      if (signedInEmail === livePilotConfig.primaryInstructorEmail) {
        const mergedEmails = normalizedInstructorEmails([
          ...configuredEmails,
          ...bootstrapEmails,
        ]);
        await api.firestoreSdk.setDoc(
          instructorAccessReference(api),
          {
            emails: mergedEmails,
            updatedAt: api.firestoreSdk.serverTimestamp(),
            updatedBy: credential.user.uid,
          },
          { merge: true },
        );
      }
    } catch (error) {
      if (!hasAccess) {
        await api.authSdk.signOut(api.auth);
        throw new Error("To konto nie ma dostępu instruktorskiego.");
      }
    }
    if (!hasAccess) {
      await api.authSdk.signOut(api.auth);
      throw new Error("To konto nie ma dostępu instruktorskiego.");
    }
    return credential;
  },

  async signOut() {
    const api = await services();
    return api.authSdk.signOut(api.auth);
  },

  async subscribeToStudioState(onData, onError) {
    const api = await services();
    return api.firestoreSdk.onSnapshot(
      studioStateReference(api),
      (snapshot) => onData(snapshot.exists() ? snapshot.data() : null),
      onError,
    );
  },

  async getStudioState() {
    const api = await services();
    const snapshot = await api.firestoreSdk.getDoc(studioStateReference(api));
    return snapshot.exists() ? snapshot.data() : null;
  },

  async saveStudioState(sharedState) {
    const api = await services();
    const user = api.auth.currentUser;
    if (!user) throw new Error("Sesja instruktora wygasła.");
    const reference = studioStateReference(api);
    await api.firestoreSdk.runTransaction(api.db, async (transaction) => {
      const snapshot = await transaction.get(reference);
      const existingState = snapshot.exists() ? snapshot.data() : {};
      const mergedState = mergeStudioState(existingState, sharedState);
      transaction.set(
        reference,
        {
          ...mergedState,
          updatedAt: api.firestoreSdk.serverTimestamp(),
          updatedBy: user.uid,
          updatedByEmail: user.email || "",
        },
        { merge: true },
      );
    });
  },

  async uploadImage(file, folder = "items") {
    const api = await services();
    const user = api.auth.currentUser;
    if (!user) throw new Error("Zaloguj się ponownie przed wysłaniem zdjęcia.");
    const extension = file.type === "image/png" ? "png" : "jpg";
    const path = [
      "studios",
      livePilotConfig.studioId,
      "users",
      user.uid,
      folder,
      `${Date.now()}-${crypto.randomUUID()}-${cleanFileName(file.name || `zdjecie.${extension}`)}`,
    ].join("/");
    const reference = api.storageSdk.ref(api.storage, path);
    try {
      await api.storageSdk.uploadBytes(reference, file, {
        contentType: file.type || "image/jpeg",
        cacheControl: "public,max-age=31536000,immutable",
      });
    } catch (error) {
      if (
        ["storage/unknown", "storage/bucket-not-found", "storage/retry-limit-exceeded"].includes(
          error?.code,
        )
      ) {
        throw new Error(
          "Magazyn zdjęć nie jest jeszcze aktywny. Uruchom Firebase Storage i spróbuj ponownie.",
        );
      }
      if (error?.code === "storage/unauthorized") {
        throw new Error("To konto nie ma uprawnień do wysyłania zdjęć.");
      }
      throw error;
    }
    return api.storageSdk.getDownloadURL(reference);
  },

  async deleteImages(urls = []) {
    const api = await services();
    const user = api.auth.currentUser;
    if (!user) throw new Error("Zaloguj się ponownie przed usunięciem zdjęć.");
    const storageUrls = [...new Set(urls)].filter(
      (url) =>
        typeof url === "string" &&
        (url.startsWith("gs://") ||
          url.startsWith("https://firebasestorage.googleapis.com/") ||
          url.includes(".firebasestorage.app/")),
    );
    const results = await Promise.allSettled(
      storageUrls.map((url) => {
        const encodedPath = url.match(/\/o\/([^?]+)/)?.[1];
        const reference =
          encodedPath && !url.startsWith("gs://")
            ? api.storageSdk.ref(api.storage, decodeURIComponent(encodedPath))
            : api.storageSdk.ref(api.storage, url);
        return api.storageSdk.deleteObject(reference);
      }),
    );
    const failed = results.find(
      (result) =>
        result.status === "rejected" &&
        result.reason?.code !== "storage/object-not-found",
    );
    if (failed) throw failed.reason;
  },

  async publishNotification(notification) {
    const api = await services();
    const user = api.auth.currentUser;
    if (!user) return;
    await api.firestoreSdk.addDoc(
      api.firestoreSdk.collection(
        api.db,
        "studios",
        livePilotConfig.studioId,
        "notifications",
      ),
      {
        ...notification,
        actorUid: user.uid,
        actorEmail: user.email || "",
        createdAt: api.firestoreSdk.serverTimestamp(),
      },
    );
  },

  async enablePushNotifications(serviceWorkerRegistration) {
    const api = await services();
    const user = api.auth.currentUser;
    if (!user) throw new Error("Zaloguj się ponownie.");
    if (!livePilotConfig.vapidKey) {
      throw new Error("Klucz powiadomień VAPID nie został jeszcze skonfigurowany.");
    }
    if (!("Notification" in window)) {
      throw new Error("Ta przeglądarka nie obsługuje powiadomień systemowych.");
    }
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Nie udzielono zgody na powiadomienia.");
    }
    const supported = await api.messagingSdk.isSupported();
    if (!supported) {
      throw new Error("Powiadomienia push nie są dostępne na tym urządzeniu.");
    }
    const messaging = api.messagingSdk.getMessaging(api.app);
    const token = await api.messagingSdk.getToken(messaging, {
      vapidKey: livePilotConfig.vapidKey,
      serviceWorkerRegistration,
    });
    if (!token) throw new Error("Nie udało się zarejestrować urządzenia.");
    await api.firestoreSdk.setDoc(
      api.firestoreSdk.doc(api.db, "pushTokens", `${user.uid}_${deviceId()}`),
      {
        token,
        uid: user.uid,
        email: user.email || "",
        studioId: livePilotConfig.studioId,
        deviceId: deviceId(),
        updatedAt: api.firestoreSdk.serverTimestamp(),
      },
    );
    return token;
  },
};
