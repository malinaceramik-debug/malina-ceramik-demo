import { liveBackend } from "./backend.js";

const STORAGE_KEY = "malina-ceramik-pwa-demo-v2";
const SESSION_KEY = "malina-ceramik-demo-session";
const demoAccounts = {
  "anna@malinaceramik.pl": {
    password: "malina123",
    role: "student",
    name: "Anna Kowalska",
  },
  "marta@malinaceramik.pl": {
    password: "malina123",
    role: "instructor",
    name: "Marta Wiśniewska",
  },
};

const icons = {
  home: `<svg viewBox="0 0 24 24"><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/></svg>`,
  archive: `<svg viewBox="0 0 24 24"><path d="M4 7h16v13H4z"/><path d="M3 4h18v3H3z"/><path d="M9 11h6"/></svg>`,
  money: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H6v1M17 15h1v-1"/></svg>`,
  bell: `<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-5 3-8 7-8s7 3 7 8"/><path d="M16 4a4 4 0 0 1 0 8M17 14c3 .7 5 3 5 7"/></svg>`,
  camera: `<svg viewBox="0 0 24 24"><path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/></svg>`,
  palette: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18h1.4a1.6 1.6 0 0 0 0-3.2h-1a1.5 1.5 0 0 1 0-3h2.8A5.8 5.8 0 0 0 21 9c0-3.3-4-6-9-6Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="10" cy="6.8" r="1"/><circle cx="15" cy="7" r="1"/><circle cx="17.5" cy="10.5" r="1"/></svg>`,
};

const initialGlazes = [
  {
    id: "lesna-zielen",
    name: "Leśna zieleń",
    brand: "Botz",
    maker: "Botz",
    code: "9870",
    image: "assets/talerz.webp",
    color: "#66785f",
    finish: "Błyszczące",
    temperature: "1220–1240°C",
    clays: ["Jasna kamionka", "Beżowa kamionka"],
    description: "Głęboka zieleń, która mocniej zbiera się w zagłębieniach i na fakturze.",
    notes: "Najpewniejszy efekt przy 2–3 cienkich warstwach.",
  },
  {
    id: "kobaltowy-deszcz",
    name: "Kobaltowy deszcz",
    brand: "Amaco",
    maker: "Amaco",
    code: "PC-27",
    image: "assets/miska.webp",
    color: "#496779",
    finish: "Efektowe",
    temperature: "1220–1240°C",
    clays: ["Jasna kamionka"],
    description: "Niebieskie przejścia i jaśniejsze smugi, szczególnie widoczne na pionowych ściankach.",
    notes: "Lubi wyraźną fakturę. Efekt może różnić się między półkami pieca.",
  },
  {
    id: "malinowy-pyl",
    name: "Malinowy pył",
    brand: "Amaco",
    maker: "Amaco",
    code: "PC-59",
    image: "assets/kubek.webp",
    color: "#a46662",
    finish: "Satynowe",
    temperature: "1200–1240°C",
    clays: ["Jasna kamionka", "Czerwona kamionka"],
    description: "Ciepły, przygaszony róż z delikatnymi zmianami tonu na rantach.",
    notes: "Na czerwonej glinie wychodzi ciemniej i bardziej ziemiście.",
  },
  {
    id: "miodowy",
    name: "Miodowy",
    brand: "Botz",
    maker: "Botz",
    code: "9472",
    image: "assets/wazon.webp",
    color: "#a06f38",
    finish: "Błyszczące",
    temperature: "1060°C",
    clays: ["Jasna glina"],
    description: "Ciepłe, transparentne szkliwo podkreślające ślady dłoni i rysunek gliny.",
    notes: "Dobrze wygląda na reliefach i odciśniętych wzorach.",
  },
];

const initialClays = [
  { id: "gs-254", brand: "G&S", code: "254", name: "Jasna kamionka" },
  { id: "gs-376", brand: "G&S", code: "376", name: "Czerwona kamionka" },
  { id: "silbeco-k12", brand: "Silbeco", code: "K-12", name: "Beżowa kamionka" },
  { id: "silbeco-11", brand: "Silbeco", code: "11", name: "Jasna glina" },
];

const materialOptions = {
  clay: ["Jasna kamionka", "Beżowa kamionka", "Czerwona kamionka", "Jasna glina"],
  glazes: initialGlazes.map((glaze) => glaze.name),
  paints: ["Kobaltowa", "Czarna", "Biała angoba", "Ceglasta angoba"],
  temperature: ["1060°C", "1200°C", "1220°C", "1240°C"],
};

const recipeCategories = [
  { id: "clay", label: "Glina", multiple: false },
  { id: "glazes", label: "Szkliwa", multiple: true },
  { id: "paints", label: "Farby", multiple: true },
  { id: "temperature", label: "Temperatura", multiple: false },
];

const initialItems = [
  {
    id: 1,
    name: "Kubek w kropki",
    owner: "Anna Kowalska",
    ownerId: "anna",
    image: "assets/kubek.webp",
    status: "waiting",
    firing: "bisque",
    group: "Dostawa 03.06",
    date: "2026-06-03",
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: [],
      paints: ["Kobaltowa"],
      temperature: ["1240°C"],
      note: "Kobalt nakładany szerokim pędzlem, dwie warstwy.",
    },
  },
  {
    id: 2,
    name: "Miska w kobalt",
    owner: "Anna Kowalska",
    ownerId: "anna",
    image: "assets/miska.webp",
    status: "ready",
    firing: "glaze",
    group: "Dostawa 28.05",
    date: "2026-05-28",
    firedAt: "2026-06-08",
    finalImages: [
      { id: "final-2-1", image: "assets/talerz.webp", date: "2026-06-09" },
    ],
    sharing: {
      combination: true,
      note: true,
      imageIds: ["final-2-1"],
    },
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: ["Kobaltowy deszcz"],
      paints: [],
      temperature: ["1240°C"],
      note: "Trzy cienkie warstwy szkliwa.",
    },
  },
  {
    id: 3,
    name: "Wazon z uszami",
    owner: "Marek Piotrowski",
    ownerId: "marek",
    image: "assets/wazon.webp",
    status: "waiting",
    firing: "bisque",
    group: "Dostawa 30.05",
    date: "2026-05-30",
    recipe: {
      clay: ["Beżowa kamionka"],
      glazes: ["Miodowy"],
      paints: [],
      temperature: ["1060°C"],
      note: "",
    },
  },
  {
    id: 4,
    name: "Talerz z gałązką",
    owner: "Zofia Malinowska",
    ownerId: "zofia",
    image: "assets/talerz.webp",
    status: "waiting",
    firing: "glaze",
    group: "Dostawa 01.06",
    date: "2026-06-01",
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: ["Leśna zieleń"],
      paints: ["Biała angoba"],
      temperature: ["1240°C"],
      note: "Szkliwo tylko wewnątrz, gałązka malowana angobą.",
    },
  },
  {
    id: 5,
    name: "Mała patera",
    owner: "Marek Piotrowski",
    ownerId: "marek",
    image: "assets/miska.webp",
    status: "ready",
    firing: "glaze",
    group: "Dostawa 24.05",
    date: "2026-05-24",
    firedAt: "2026-06-06",
    recipe: {
      clay: ["Czerwona kamionka"],
      glazes: ["Malinowy pył"],
      paints: [],
      temperature: ["1220°C"],
      note: "",
    },
  },
  {
    id: 6,
    name: "Kubek śniadaniowy",
    owner: "Anna Kowalska",
    ownerId: "anna",
    image: "assets/kubek.webp",
    status: "collected",
    firing: "glaze",
    group: "Dostawa 12.05",
    date: "2026-05-12",
    firedAt: "2026-05-22",
    finalImages: [
      { id: "final-6-1", image: "assets/miska.webp", date: "2026-05-23" },
      { id: "final-6-2", image: "assets/talerz.webp", date: "2026-05-24" },
    ],
    sharing: {
      combination: true,
      note: true,
      imageIds: ["final-6-1"],
    },
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: ["Leśna zieleń"],
      paints: [],
      temperature: ["1240°C"],
      note: "Dwie warstwy. Na rancie kolor wyszedł jaśniejszy.",
    },
  },
  {
    id: 101,
    name: "Próba zieleni na czarce",
    owner: "Marta Wiśniewska",
    ownerId: "marta",
    image: "assets/kubek.webp",
    status: "collected",
    firing: "glaze",
    group: "Dziennik instruktora",
    date: "2026-05-18",
    firedAt: "2026-05-26",
    finalImages: [
      { id: "final-101-1", image: "assets/talerz.webp", date: "2026-05-27" },
    ],
    sharing: {
      combination: true,
      note: true,
      imageIds: ["final-101-1"],
    },
    recipe: {
      clay: ["Jasna kamionka"],
      glazes: ["Leśna zieleń"],
      paints: [],
      temperature: ["1240°C"],
      note: "Dwie warstwy. Cieńsza warstwa na rancie dała jaśniejszy efekt.",
    },
  },
  {
    id: 102,
    name: "Wazon z próbą angoby",
    owner: "Marta Wiśniewska",
    ownerId: "marta",
    image: "assets/wazon.webp",
    status: "waiting",
    firing: "glaze",
    group: "Dziennik instruktora",
    date: "2026-06-06",
    finalImages: [],
    recipe: {
      clay: ["Czerwona kamionka"],
      glazes: [],
      paints: ["Biała angoba"],
      temperature: ["1220°C"],
      note: "Angoba nakładana gąbką na podsuszoną glinę.",
    },
  },
];

const initialState = {
  role: "student",
  view: "home",
  studentFilter: "all",
  studentItemsTab: "studio",
  instructorPersonalFilter: "all",
  combinationFilter: "all",
  instructorStatus: "all",
  instructorFiring: "all",
  catalogGlazeBrands: [],
  catalogGlazes: [],
  catalogClayBrands: [],
  catalogClays: [],
  search: "",
  selected: [],
  items: initialItems,
  emailEvents: [],
  notifications: [],
  customMaterialOptions: {
    clay: [],
    glazes: [],
    paints: [],
    temperature: [],
  },
  payments: [
    {
      id: 3,
      owner: "Anna Kowalska",
      date: "2026-05-24",
      bisque: 0.7,
      glaze: 0.9,
      total: 60.1,
    },
    {
      id: 1,
      owner: "Zofia Malinowska",
      date: "2026-06-07",
      bisque: 1.2,
      glaze: 0.8,
      total: 70,
    },
    {
      id: 2,
      owner: "Marek Piotrowski",
      date: "2026-06-04",
      bisque: 2.1,
      glaze: 0,
      total: 58.8,
    },
  ],
};

let state = loadState();
let addFlow = {
  step: 1,
  photos: [],
};
let recipeDraft = null;
let finalPhotoTargetId = null;
let journalDraft = null;
let combinationShareMode = false;
let combinationShareSelection = [];
let guestLoginActive = false;
let toastTimer;
let liveMode = false;
let liveUser = null;
let liveStateUnsubscribe = null;
let liveSaveTimer = null;
let lastRemoteStateHash = "";
let serviceWorkerRegistration = null;
let liveStateLoaded = false;

const sharedStateKeys = [
  "items",
  "payments",
  "emailEvents",
  "notifications",
  "customMaterialOptions",
];

function currentInstructorId() {
  return liveMode && liveUser ? liveUser.uid : "marta";
}

function currentInstructorName() {
  return (
    liveUser?.displayName ||
    liveUser?.email?.split("@")[0] ||
    "Instruktor Malina"
  );
}

function liveEmptyState() {
  return {
    ...structuredClone(initialState),
    role: "instructor",
    view: "gallery",
    items: [],
    payments: [],
    emailEvents: [],
    notifications: [],
  };
}

function sharedStatePayload() {
  return Object.fromEntries(
    sharedStateKeys.map((key) => [key, structuredClone(state[key] || [])]),
  );
}

function sharedStateHash(payload = sharedStatePayload()) {
  return JSON.stringify(payload);
}

function applyRemoteState(remoteState) {
  const knownNotificationIds = new Set(
    (state.notifications || []).map((notification) => notification.id),
  );
  const newNotifications = (remoteState.notifications || []).filter(
    (notification) =>
      !knownNotificationIds.has(notification.id) &&
      notification.actorUid !== liveUser?.uid,
  );
  sharedStateKeys.forEach((key) => {
    if (remoteState?.[key] !== undefined) {
      state[key] = structuredClone(remoteState[key]);
    }
  });
  lastRemoteStateHash = sharedStateHash();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
  if (
    liveStateLoaded &&
    typeof Notification !== "undefined" &&
    Notification.permission === "granted"
  ) {
    newNotifications.forEach((notification) => {
      const systemNotification = new Notification(notification.title, {
        body: notification.body,
        icon: "assets/malina-app-icon.png",
      });
      systemNotification.onclick = () => window.focus();
    });
  }
  liveStateLoaded = true;
}

function scheduleRemoteSave() {
  if (!liveMode || !liveUser) return;
  const payload = sharedStatePayload();
  const nextHash = sharedStateHash(payload);
  if (nextHash === lastRemoteStateHash) return;
  clearTimeout(liveSaveTimer);
  liveSaveTimer = setTimeout(async () => {
    try {
      await liveBackend.saveStudioState(payload);
      lastRemoteStateHash = nextHash;
      setCloudStatus("Zapisano w chmurze", "ready");
    } catch (error) {
      setCloudStatus("Brak synchronizacji", "error");
      showToast(error.message || "Nie udało się zapisać zmian w chmurze.");
    }
  }, 250);
}

function setCloudStatus(label, status = "ready") {
  const badge = document.querySelector("#cloud-status");
  if (!badge) return;
  badge.textContent = label;
  badge.dataset.status = status;
}

function configureLiveInterface() {
  document.body.classList.add("live-pilot");
  document.querySelector("#guest-login-toggle").classList.add("hidden");
  document.querySelector("#demo-login").classList.add("hidden");
  document.querySelector(".role-switch").classList.add("hidden");
  document.querySelector("#reset-demo").classList.add("hidden");
  document.querySelector("#login-title").textContent = "Panel instruktora";
  document.querySelector("#environment-title").textContent = "Pilot instruktorów";
  setCloudStatus("Łączenie z chmurą...", "syncing");
}

async function connectLiveUser(user) {
  liveUser = user;
  const session = {
    email: user.email || "",
    role: "instructor",
    name: currentInstructorName(),
    uid: user.uid,
    liveAccess: true,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  state = liveEmptyState();
  liveStateLoaded = false;
  showApplication(session);
  setCloudStatus("Pobieranie danych...", "syncing");
  if (liveStateUnsubscribe) liveStateUnsubscribe();
  liveStateUnsubscribe = await liveBackend.subscribeToStudioState(
    async (remoteState) => {
      if (!remoteState) {
        const emptyState = sharedStatePayload();
        await liveBackend.saveStudioState(emptyState);
        lastRemoteStateHash = sharedStateHash(emptyState);
        setCloudStatus("Połączono", "ready");
        return;
      }
      applyRemoteState(remoteState);
      setCloudStatus("Połączono", "ready");
    },
    (error) => {
      setCloudStatus("Brak synchronizacji", "error");
      showToast(error.message || "Nie udało się pobrać danych pracowni.");
    },
  );
}

async function initializeLivePilot() {
  if (new URLSearchParams(location.search).has("demo")) return false;
  if (!liveBackend.isConfigured()) return false;
  liveMode = true;
  configureLiveInterface();
  await liveBackend.observeAuth(
    async (user) => {
      if (user) {
        await connectLiveUser(user);
        return;
      }
      liveUser = null;
      if (liveStateUnsubscribe) {
        liveStateUnsubscribe();
        liveStateUnsubscribe = null;
      }
      localStorage.removeItem(SESSION_KEY);
      showLogin();
    },
    () => {
      showLogin();
      const error = document.querySelector("#login-error");
      error.textContent = "Usługa logowania nie została jeszcze aktywowana.";
      error.classList.remove("hidden");
    },
  );
  return true;
}

function currentSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function isRestrictedGuestSession(session = currentSession()) {
  return session?.role === "guest" && session.guestAccess !== false;
}

function showLogin() {
  clearTimeout(toastTimer);
  document.querySelector("#toast").classList.add("hidden");
  document.querySelector("#login-screen").classList.remove("hidden");
  document.querySelector("#app-shell").classList.add("hidden");
  document.querySelector("#mobile-nav").classList.add("hidden");
  document.body.classList.add("login-visible");
  document.body.classList.remove("guest-mode");
  document.querySelector("#login-email").focus();
}

function showApplication(session) {
  state.role = session.role;
  if (
    (state.role === "student" && !["home", "my-items", "combinations", "glazes", "notifications"].includes(state.view)) ||
    (state.role === "instructor" && !["gallery", "glazes", "journal", "combinations", "notifications", "settlements", "clients", "archive"].includes(state.view)) ||
    (state.role === "guest" && state.view !== "guest-items")
  ) {
    state.view =
      state.role === "student" ? "home" : state.role === "instructor" ? "gallery" : "guest-items";
  }
  document.querySelector("#login-screen").classList.add("hidden");
  document.querySelector("#app-shell").classList.remove("hidden");
  document.querySelector("#mobile-nav").classList.toggle("hidden", state.role === "guest");
  document.body.classList.remove("login-visible");
  document.body.classList.toggle("guest-mode", state.role === "guest");
  render();
}

async function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  if (liveMode) {
    const submit = document.querySelector("#login-submit");
    try {
      submit.disabled = true;
      submit.textContent = "Logowanie...";
      await liveBackend.signIn(normalizedEmail, password);
      document.querySelector("#login-error").classList.add("hidden");
    } catch {
      const error = document.querySelector("#login-error");
      error.textContent = "Nieprawidłowy e-mail lub hasło instruktora.";
      error.classList.remove("hidden");
    } finally {
      submit.disabled = false;
      submit.textContent = "Zaloguj się";
    }
    return;
  }
  const account = demoAccounts[normalizedEmail];
  if (!account || account.password !== password) {
    const error = document.querySelector("#login-error");
    error.textContent = "Nieprawidłowy e-mail lub hasło.";
    error.classList.remove("hidden");
    return;
  }
  const session = { email: normalizedEmail, role: account.role, name: account.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  state.role = account.role;
  state.view = account.role === "student" ? "home" : "gallery";
  saveState();
  document.querySelector("#login-error").classList.add("hidden");
  showApplication(session);
}

function guestOwnerId(email) {
  return `guest:${email.trim().toLowerCase()}`;
}

function loginAsGuest(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const emailInput = document.querySelector("#login-email");
  if (!normalizedEmail || !emailInput.checkValidity()) {
    const error = document.querySelector("#login-error");
    error.textContent = "Wpisz poprawny adres e-mail.";
    error.classList.remove("hidden");
    return;
  }
  const session = {
    email: normalizedEmail,
    role: "guest",
    name: "Gość",
    ownerId: guestOwnerId(normalizedEmail),
    guestAccess: true,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  state.role = "guest";
  state.view = "guest-items";
  saveState();
  document.querySelector("#login-error").classList.add("hidden");
  showApplication(session);
}

function setGuestLogin(active) {
  guestLoginActive = active;
  const toggle = document.querySelector("#guest-login-toggle");
  toggle.classList.toggle("active", active);
  toggle.setAttribute("aria-pressed", String(active));
  document.querySelector("#login-password-field").classList.toggle("hidden", active);
  document.querySelector("#demo-login").classList.toggle("hidden", active);
  document.querySelector("#login-title").textContent = active ? "Wejdź jako gość" : "Witaj ponownie";
  document.querySelector("#login-submit").textContent = active ? "Przejdź do swoich wyrobów" : "Zaloguj się";
  document.querySelector("#login-error").classList.add("hidden");
  if (active) document.querySelector("#login-email").focus();
}

async function logout() {
  if (liveMode) {
    await liveBackend.signOut();
    return;
  }
  localStorage.removeItem(SESSION_KEY);
  document.querySelector("#profile-menu").classList.add("hidden");
  document.querySelector("#login-form").reset();
  setGuestLogin(false);
  showLogin();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(initialState);
    let items = (saved.items || initialItems).map((item) => {
      const demoItem = initialItems.find((candidate) => candidate.id === item.id);
      const normalized = {
        ...item,
        personalJournal: item.ownerId === "marta" ? false : item.personalJournal,
        code: item.code || `MC-${String(item.id).padStart(4, "0")}`,
        recipe: normalizeRecipe(item.recipe),
        finalImages: normalizeFinalImages(item.finalImages),
        sharing: normalizeSharing(item.sharing || demoItem?.sharing),
      };
      if (/^Wyrób \d+$/.test(normalized.name || "")) delete normalized.name;
      return normalized;
    });
    for (const demoItem of initialItems.filter((item) => item.ownerId === "marta")) {
      if (items.some((item) => item.id === demoItem.id)) continue;
      items.push({
        ...structuredClone(demoItem),
        code: `MC-${String(demoItem.id).padStart(4, "0")}`,
        recipe: normalizeRecipe(demoItem.recipe),
        finalImages: normalizeFinalImages(demoItem.finalImages),
        sharing: normalizeSharing(demoItem.sharing),
      });
    }
    const payments = [...(saved.payments || initialState.payments)];
    const demoStudentPayment = initialState.payments.find(
      (payment) => payment.owner === "Anna Kowalska",
    );
    if (
      demoStudentPayment &&
      !payments.some((payment) => payment.owner === "Anna Kowalska")
    ) {
      payments.unshift(structuredClone(demoStudentPayment));
    }
    return {
      ...initialState,
      ...saved,
      studentItemsTab: saved.studentItemsTab === "payments" ? "payments" : "studio",
      items,
      emailEvents: Array.isArray(saved.emailEvents) ? saved.emailEvents : [],
      notifications: Array.isArray(saved.notifications) ? saved.notifications : [],
      payments,
    };
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleRemoteSave();
}

function normalizeRecipe(recipe = {}) {
  return {
    clay: Array.isArray(recipe.clay) ? recipe.clay : [],
    glazes: Array.isArray(recipe.glazes) ? recipe.glazes : [],
    paints: Array.isArray(recipe.paints) ? recipe.paints : [],
    temperature: Array.isArray(recipe.temperature) ? recipe.temperature : [],
    note: recipe.note || "",
  };
}

function isCombinationCategorized(item) {
  const recipe = normalizeRecipe(item.recipe);
  return (
    recipeCategories.some((category) => recipe[category.id].length) ||
    Boolean(recipe.note)
  );
}

function isCombinationShared(item) {
  const sharing = normalizeSharing(item.sharing);
  return sharing.combination && sharing.imageIds.length;
}

function normalizeFinalImages(images = []) {
  return Array.isArray(images)
    ? images.map((entry, index) =>
        typeof entry === "string"
          ? { id: `legacy-${index}`, image: entry, date: "2026-06-10" }
          : entry,
      )
    : [];
}

function normalizeSharing(sharing = {}) {
  return {
    combination: Boolean(sharing.combination),
    note: Boolean(sharing.note),
    imageIds: Array.isArray(sharing.imageIds) ? sharing.imageIds : [],
  };
}

function icon(name) {
  return `<span class="nav-icon" aria-hidden="true">${icons[name] || icons.home}</span>`;
}

function navItems() {
  if (state.role === "guest") return [];
  if (state.role === "student") {
    return [
      { id: "home", label: "Początek", icon: "home" },
      { id: "my-items", label: "Moje wyroby", icon: "gallery" },
      { id: "combinations", label: "Moje kombinacje", icon: "palette" },
      { id: "glazes", label: "Wspólne kombinacje", icon: "users" },
      { id: "notifications", label: "Powiadomienia", icon: "bell" },
    ];
  }
  return [
    { id: "gallery", label: "Do wypału", icon: "gallery" },
    { id: "journal", label: "Moja ceramika", icon: "gallery" },
    { id: "notifications", label: "Powiadomienia", icon: "bell" },
    { id: "settlements", label: "Rozliczenia", icon: "money" },
    { id: "clients", label: "Kursanci", icon: "users" },
    { id: "archive", label: "Archiwum", icon: "archive" },
  ];
}

function utilityNavItem() {
  return { id: "glazes", label: "Biblioteka szkliw", icon: "palette" };
}

function statusLabel(status) {
  return {
    waiting: "Czeka na wypał",
    ready: "Gotowy do odbioru",
    collected: "Odebrany",
  }[status];
}

function firingLabel(firing) {
  return firing === "bisque" ? "Biskwit" : "Na ostro";
}

function itemCode(item) {
  return item.code || `MC-${String(item.id).padStart(4, "0")}`;
}

function itemLabel(item) {
  return item.name || itemCode(item);
}

function studentItemLabel(item) {
  return item.personalTitle || item.name || `Wyrób z ${formatFullDate(item.date)}`;
}

function isOwnItem(item) {
  const session = currentSession();
  return (
    (state.role === "student" && item.ownerId === "anna") ||
    (state.role === "instructor" && item.ownerId === currentInstructorId()) ||
    (state.role === "guest" && item.ownerId === session?.ownerId)
  );
}

function visibleItemLabel(item) {
  if (item.personalJournal) return item.name || `Wpis z ${formatFullDate(item.date)}`;
  return isOwnItem(item) ? studentItemLabel(item) : itemCode(item);
}

function displayItemImage(item) {
  const finalImages = normalizeFinalImages(item.finalImages);
  return finalImages.length ? finalImages[finalImages.length - 1].image : item.image;
}

function sharedCatalogImage(item) {
  const sharing = normalizeSharing(item.sharing);
  const sharedId = sharing.imageIds[0];
  if (sharedId === "before") return item.image;
  return normalizeFinalImages(item.finalImages).find((entry) => entry.id === sharedId)?.image;
}

function canEditItem(item) {
  return isOwnItem(item) && state.role !== "guest";
}

function firingLegend() {
  return `
    <div class="firing-legend" aria-label="Kolory rodzaju wypalu">
      <span><i class="bisque" aria-hidden="true"></i>Biskwit</span>
      <span><i class="glaze" aria-hidden="true"></i>Na ostro</span>
    </div>
  `;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));
}

function formatFullDate(value) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
  }).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function daysSince(value) {
  const now = new Date("2026-06-11T12:00:00");
  const then = new Date(`${value}T12:00:00`);
  return Math.max(0, Math.round((now - then) / 86400000));
}

function pluralItems(count) {
  if (count === 1) return "wyrób";
  if (count >= 2 && count <= 4) return "wyroby";
  return "wyrobów";
}

function renderNav() {
  const items = navItems();
  const makeMarkup = (navItemsToRender) =>
    navItemsToRender
      .map(
        (item) => `
        <button class="nav-button ${state.view === item.id ? "active" : ""}" data-view="${item.id}" type="button">
          ${icon(item.icon)}
          <span>${item.label}</span>
        </button>`,
      )
      .join("");
  const markup = makeMarkup(items);
  const mobileItems =
    state.role === "instructor"
      ? ["gallery", "settlements", "clients", "journal", "notifications"].map((id) =>
          items.find((item) => item.id === id),
        )
      : items;
  const utilityItem = utilityNavItem();
  const utilityMarkup =
    state.role === "instructor"
      ? `
        <button class="nav-button utility-nav-button personal-combinations-link ${state.view === "combinations" ? "active" : ""}" data-view="combinations" type="button">
          ${icon("palette")}
          <span>Moje kombinacje</span>
        </button>
        <div class="utility-nav-label">Biblioteka wspólna</div>
        <button class="nav-button utility-nav-button ${state.view === utilityItem.id ? "active" : ""}" data-view="${utilityItem.id}" type="button">
          ${icon(utilityItem.icon)}
          <span>${utilityItem.label}</span>
        </button>`
      : "";
  document.querySelector("#desktop-nav").innerHTML = markup;
  document.querySelector("#desktop-utility-nav").innerHTML = utilityMarkup;
  document.querySelector("#mobile-nav").innerHTML = makeMarkup(mobileItems);
  document.querySelector(".mobile-brand").dataset.view =
    state.role === "instructor" ? "gallery" : state.role === "student" ? "home" : "guest-items";
}

function renderProfile() {
  const isStudent = state.role === "student";
  const isGuest = state.role === "guest";
  const session = currentSession();
  const profileName = liveMode
    ? session?.name || currentInstructorName()
    : isGuest
      ? "Gość"
      : isStudent
        ? "Anna Kowalska"
        : "Marta Wiśniewska";
  const initials = profileName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  document.querySelector("#avatar").textContent = initials || (isGuest ? "G" : "M");
  document.querySelector("#profile-name").textContent = profileName;
  document.querySelector("#profile-role").textContent = isGuest
    ? "Wypał gościnny"
    : isStudent
      ? "Kursantka"
      : "Instruktorka";
  document.querySelector("#profile-menu-name").textContent = profileName;
  document.querySelector("#profile-menu-email").textContent =
    session?.email || (isStudent ? "anna@malinaceramik.pl" : "marta@malinaceramik.pl");
  document
    .querySelector(".role-switch")
    .classList.toggle("hidden", liveMode || isRestrictedGuestSession(session));
  document.querySelectorAll("[data-role]").forEach((button) => {
    button.classList.toggle("active", button.dataset.role === state.role);
  });
}

function render() {
  renderNav();
  renderProfile();
  const content = document.querySelector("#app-content");

  if (state.role === "guest") {
    content.innerHTML = guestItemsView();
  } else if (state.role === "student") {
    if (state.view === "home") content.innerHTML = studentHome();
    else if (state.view === "my-items") content.innerHTML = studentItems();
    else if (state.view === "combinations") content.innerHTML = studentCombinations();
    else if (state.view === "glazes") content.innerHTML = glazeCatalogView();
    else content.innerHTML = notificationsView();
  } else {
    if (state.view === "gallery") content.innerHTML = instructorGallery();
    else if (state.view === "glazes") content.innerHTML = glazeCatalogView();
    else if (state.view === "journal") content.innerHTML = instructorCeramicsView();
    else if (state.view === "combinations") content.innerHTML = studentCombinations();
    else if (state.view === "notifications") content.innerHTML = notificationsView();
    else if (state.view === "settlements") content.innerHTML = settlementsView();
    else if (state.view === "clients") content.innerHTML = clientsView();
    else content.innerHTML = instructorArchive();
  }

  attachViewListeners();
}

function guestItemsView() {
  const session = currentSession();
  const mine = state.items
    .filter((item) => item.ownerId === session?.ownerId)
    .sort((a, b) => {
      const priority = { ready: 0, waiting: 1, collected: 2 };
      return priority[a.status] - priority[b.status] || b.date.localeCompare(a.date);
    });
  const messages = (state.emailEvents || [])
    .filter((event) => event.email === session?.email)
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 2);

  return `
    <div class="student-items-page guest-items-page">
      <div class="page-head my-items-head">
        <div>
          <p class="eyebrow">Wypał gościnny</p>
          <h1>Twoja ceramika</h1>
        </div>
        <button class="primary-button my-items-add" id="open-add-flow" type="button"><span class="button-icon">+</span> <span>Dodaj</span></button>
      </div>
      <div class="my-items-navigation">
        <span>${escapeHtml(session?.email || "")}</span>
      </div>
      ${messages.map(guestEmailMessage).join("")}
      <p class="gallery-gesture-hint">Przytrzymaj zdjęcie, aby otworzyć podgląd.</p>
      ${
        mine.length
          ? studentGallerySections(mine)
          : emptyState("Nie masz jeszcze dodanych wyrobów", "Dodaj zdjęcie ceramiki, którą zostawiasz do wypału.")
      }
    </div>
  `;
}

function guestEmailMessage(event) {
  const fired = event.type === "fired";
  return `
    <div class="guest-email-note">
      ${icon("bell")}
      <div>
        <strong>${fired ? "Ceramika została wypalona" : "Ceramika została dodana"}</strong>
        <span>Demo wiadomości wysłanej na ${escapeHtml(event.email)}.</span>
      </div>
    </div>
  `;
}

function studentHome() {
  const mine = state.items.filter((item) => item.ownerId === "anna" && !item.personalJournal);
  const waiting = mine.filter((item) => item.status === "waiting").length;
  const ready = mine.filter((item) => item.status === "ready").length;
  const collected = mine.filter((item) => item.status === "collected").length;

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Czwartek, 11 czerwca</p>
        <h1>Dzień dobry, Aniu.</h1>
      </div>
    </div>

    <div class="hero-grid">
      <article class="action-card">
        <p class="eyebrow">Nowa dostawa</p>
        <h2>Zostawiasz dziś ceramikę?</h2>
        <button class="primary-button" id="open-add-flow" type="button">
          <span class="button-icon">+</span>
          Dodaj moje wyroby
        </button>
      </article>
    </div>

    <div class="section-head">
      <div>
        <h2>Twoja ceramika</h2>
      </div>
      <button class="ghost-button" data-view="my-items" type="button">Zobacz galerię →</button>
    </div>

    <div class="stats-grid">
      ${statCard("Czeka na wypał", waiting, "waiting", "waiting")}
      ${statCard("Gotowe do odbioru", ready, "ready", "ready")}
      ${statCard("Odebrane", collected, "archived", "collected")}
    </div>

    <div class="section-head">
      <div>
        <h2>Ostatnio dodane</h2>
      </div>
    </div>
    <div class="items-grid">
      ${mine
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 3)
        .map((item) => itemCard(item, false))
        .join("")}
    </div>

    <article class="catalog-teaser">
      <div>
        <p class="eyebrow">Wspólna biblioteka Malina Ceramik</p>
        <h2>Biblioteka szkliw i efektów</h2>
      </div>
      <button class="primary-button" data-view="glazes" type="button">Zobacz bibliotekę szkliw</button>
    </article>
  `;
}

function statCard(label, count, status, filter) {
  return `
    <button class="stat-card" data-stat-filter="${filter}" type="button" aria-label="${label}: ${count}. Otwórz galerię">
      <div class="stat-card-top">
        <span>${label}</span>
        <i class="mini-status ${status}" aria-hidden="true"></i>
      </div>
      <span class="stat-card-value">
        <strong>${count}</strong>
        <i class="stat-card-arrow" aria-hidden="true">→</i>
      </span>
    </button>`;
}

function studentItems() {
  const mine = state.items.filter((item) => item.ownerId === "anna" && !item.personalJournal);
  const payments = state.payments.filter((payment) => payment.owner === "Anna Kowalska");
  const showingPayments = state.studentItemsTab === "payments";

  return `
    <div class="student-items-page">
      <div class="page-head my-items-head">
        <div>
        <h1>Moje wyroby</h1>
        </div>
        <button class="primary-button my-items-add" id="open-add-flow" type="button"><span class="button-icon">+</span> <span>Dodaj</span></button>
      </div>
      <div class="my-items-navigation">
        <span>${showingPayments ? "Historia opłat" : `${mine.length} ${pluralItems(mine.length)}`}</span>
        <button class="payments-shortcut ${showingPayments ? "active" : ""}" data-items-tab="${showingPayments ? "studio" : "payments"}" type="button">
          ${icon(showingPayments ? "gallery" : "money")}
          <span>${showingPayments ? "Wróć do wyrobów" : "Opłaty"}</span>
          ${!showingPayments && payments.length ? `<strong>${payments.length}</strong>` : ""}
        </button>
      </div>
      ${studentItemsTabContent(mine, payments)}
    </div>
  `;
}

function studentItemsTabContent(mine, payments) {
  if (state.studentItemsTab === "payments") {
    const total = payments.reduce((sum, payment) => sum + payment.total, 0);
    return `
      <section class="payments-summary">
        <div>
          <small>Liczba rozliczeń</small>
          <strong>${payments.length}</strong>
        </div>
        <div>
          <small>Łącznie opłacono</small>
          <strong>${formatMoney(total)}</strong>
        </div>
      </section>
      <section class="panel">
        <div class="history-list">
          ${
            payments.length
              ? payments.map(historyRow).join("")
              : emptyState("Jeszcze bez opłat", "Pierwsze rozliczenie pojawi się tutaj po odbiorze ceramiki.")
          }
        </div>
      </section>
    `;
  }

  const filters = [
    ["all", "Wszystkie"],
    ["ready", "Do odbioru"],
    ["waiting", "Czekają"],
    ["collected", "Odebrane"],
  ];
  const items = mine
    .filter((item) => state.studentFilter === "all" || item.status === state.studentFilter)
    .sort((a, b) => {
      const priority = { ready: 0, waiting: 1, collected: 2 };
      return priority[a.status] - priority[b.status] || b.date.localeCompare(a.date);
    });

  return `
    <div class="my-items-filter-row" aria-label="Filtr statusu">
      ${filters
        .map(
          ([id, label]) =>
            `<button class="filter-chip quiet-filter status-filter ${id} ${state.studentFilter === id ? "active" : ""}" data-student-filter="${id}" type="button">${label}</button>`,
        )
        .join("")}
    </div>
    <p class="gallery-gesture-hint">Przytrzymaj zdjęcie, aby otworzyć podgląd.</p>
    ${
      items.length
        ? studentGallerySections(items)
        : emptyState(
            "Tu jest pusto",
            "Zmień filtr albo dodaj nowy wyrób.",
          )
    }
  `;
}

function studentGallerySections(items) {
  const sections = [
    ["ready", "Do odbioru", ""],
    ["waiting", "Czekają na wypał", ""],
    ["collected", "Odebrane", ""],
  ];

  return sections
    .map(([status, title, copy]) =>
      gallerySection(title, copy, items.filter((item) => item.status === status), false, status),
    )
    .join("");
}

function studentCombinations() {
  const ownerId = state.role === "student" ? "anna" : currentInstructorId();
  const allItems = state.items
    .filter((item) => item.ownerId === ownerId)
    .sort(
      (a, b) =>
        Number(isCombinationCategorized(a)) - Number(isCombinationCategorized(b)) ||
        b.date.localeCompare(a.date) ||
        b.id - a.id,
    );
  const categorized = allItems.filter(isCombinationCategorized);
  const withFinal = allItems.filter((item) => normalizeFinalImages(item.finalImages).length);
  const shared = allItems.filter(isCombinationShared);
  const collected = allItems.filter((item) => item.status === "collected");
  const categorizedCollected = collected.filter(isCombinationCategorized).length;
  const filteredItems = allItems.filter((item) => {
    if (state.combinationFilter === "categorized") return isCombinationCategorized(item);
    if (state.combinationFilter === "final") return normalizeFinalImages(item.finalImages).length;
    if (state.combinationFilter === "shared") return isCombinationShared(item);
    if (state.combinationFilter === "collected") return item.status === "collected";
    return true;
  });

  return `
    <div class="page-head combinations-page-head">
      <div>
        <p class="eyebrow">Prywatny dziennik ceramiczny</p>
        <h1>Moje kombinacje</h1>
      </div>
      <button class="primary-button" id="${state.role === "student" ? "open-combination-flow" : "open-add-flow"}" type="button"><span class="button-icon">+</span> ${state.role === "student" ? "Dodaj wpis" : "Dodaj wyrób"}</button>
    </div>
    <div class="combination-stats" aria-label="Filtry dziennika">
      ${combinationStatButton("categorized", categorized.length, "Zapisane kombinacje")}
      ${combinationStatButton("final", withFinal.length, "Z efektem finalnym")}
      <div class="combination-stat-share">
        ${combinationStatButton("shared", shared.length, "Udostępnione pracowni")}
        <button class="combination-share-plus ${combinationShareMode ? "active" : ""}" id="start-combination-sharing" type="button" aria-label="Zmień udostępnianie kombinacji">+</button>
      </div>
      ${combinationStatButton(
        "collected",
        `${categorizedCollected}/${collected.length}`,
        "Skatalogowane odebrane",
      )}
    </div>
    <div class="combination-journal-head">
      <div>
        <p class="eyebrow">Dziennik</p>
        <h2>${combinationFilterLabel(state.combinationFilter)}</h2>
      </div>
      <span>${filteredItems.length} ${pluralItems(filteredItems.length)}</span>
    </div>
    ${
      filteredItems.length
        ? `<div class="combination-grid">${filteredItems.map(combinationCard).join("")}</div>`
        : emptyState("Brak wyrobów", "Wybierz inny filtr.")
    }
    ${
      combinationShareMode
        ? `<div class="combination-share-bar">
            <strong>Wybrano ${combinationShareSelection.length}</strong>
            <div>
              <button class="secondary-button" id="cancel-combination-sharing" type="button">Anuluj</button>
              <button class="primary-button" id="save-combination-sharing" type="button">Zapisz udostępnianie</button>
            </div>
          </div>`
        : ""
    }
  `;
}

function combinationStatButton(filter, value, label) {
  return `
    <button class="combination-stat ${state.combinationFilter === filter ? "active" : ""}" data-combination-filter="${filter}" type="button" aria-pressed="${state.combinationFilter === filter}">
      <strong>${value}</strong>
      <span>${label}</span>
    </button>
  `;
}

function combinationFilterLabel(filter) {
  const labels = {
    categorized: "Zapisane kombinacje",
    final: "Z efektem finalnym",
    shared: "Udostępnione pracowni",
    collected: "Odebrane wyroby",
  };
  return labels[filter] || "Wszystkie wyroby";
}

function combinationCard(item) {
  const recipe = normalizeRecipe(item.recipe);
  const categorized = isCombinationCategorized(item);
  const isShared = isCombinationShared(item);
  const shareSelectable = combinationShareMode && categorized;
  const selected = combinationShareSelection.includes(item.id);
  const materials = [...recipe.clay, ...recipe.glazes, ...recipe.paints, ...recipe.temperature];
  return `
    <article class="combination-card ${categorized ? "categorized" : "uncategorized"} ${selected ? "share-selected" : ""}" data-item-id="${item.id}" data-selectable="false" data-share-selectable="${shareSelectable}" role="button" tabindex="0" aria-label="${shareSelectable ? "Zaznacz do udostępnienia" : `Otwórz ${escapeHtml(studentItemLabel(item))}`}">
      <div class="combination-card-photo">
        <img src="${displayItemImage(item)}" alt="" />
        ${
          shareSelectable
            ? `<span class="combination-share-check" aria-hidden="true">${selected ? "✓" : ""}</span>`
            : `<span class="sharing-badge ${isShared ? "shared" : "private"}">${isShared ? "Udostępniona" : categorized ? "Prywatna" : "Do uzupełnienia"}</span>`
        }
      </div>
      <div class="combination-card-body">
        <small>${formatFullDate(item.date)}</small>
        <h2>${escapeHtml(studentItemLabel(item))}</h2>
        ${
          materials.length
            ? `<div class="combination-tags">${materials
                .slice(0, 5)
                .map((value) => `<span>${escapeHtml(value)}</span>`)
                .join("")}</div>`
            : '<span class="combination-empty-label">Dodaj materiały</span>'
        }
        ${recipe.note ? `<p>${escapeHtml(recipe.note)}</p>` : ""}
      </div>
    </article>
  `;
}

function gallerySection(title, copy, items, selectable, sectionId) {
  if (!items.length) return "";
  return `
    <section class="gallery-section" data-gallery-section="${sectionId}">
      <div class="gallery-section-head">
        <div>
          <h2>${title}</h2>
          ${copy ? `<p>${copy}</p>` : ""}
        </div>
        <span>${items.length} ${pluralItems(items.length)}</span>
      </div>
      <div class="items-grid gallery-grid">
        ${items.map((item) => itemCard(item, selectable && item.status === "waiting")).join("")}
      </div>
    </section>
  `;
}

function itemCard(item, selectable) {
  const selected = state.selected.includes(item.id);
  const label = visibleItemLabel(item);
  const isStudentItem = isOwnItem(item) && !item.personalJournal;
  const isJournalItem = state.role === "instructor" && item.personalJournal;
  const groupItems = state.items
    .filter((candidate) => candidate.ownerId === item.ownerId && candidate.group === item.group)
    .sort((a, b) => a.id - b.id);
  const position = groupItems.findIndex((candidate) => candidate.id === item.id) + 1;
  const recipeCount = recipeCategories.reduce(
    (count, category) => count + normalizeRecipe(item.recipe)[category.id].length,
    0,
  );
  const finalImages = normalizeFinalImages(item.finalImages);
  const cardImage = displayItemImage(item);
  return `
    <article class="item-card firing-${item.firing} ${selected ? "selected" : ""}" data-item-id="${item.id}" data-selectable="${selectable}" role="button" tabindex="0" aria-label="${selectable ? "Zaznacz wyrób" : `Otwórz ${escapeHtml(label)}`}">
      <div class="item-photo">
        <img src="${cardImage}" alt="${label}, wyrób: ${item.owner}" />
        ${selectable ? `<span class="select-circle" aria-hidden="true">✓</span>` : ""}
        <span class="status-pill ${item.status}">${isJournalItem ? journalStageLabel(item.journalStage) : statusLabel(item.status)}</span>
        <span class="firing-pill ${item.firing}">${firingLabel(item.firing)}</span>
        ${finalImages.length ? `<span class="final-photo-pill">${finalImages.length > 1 ? `${finalImages.length} zdjęcia efektu` : "Efekt finalny"}</span>` : ""}
      </div>
      <div class="item-body">
        <div class="item-title-row">
          <div>
            <h3>${label}</h3>
            <p>${
              isStudentItem
                ? groupItems.length > 1
                  ? `${position} z ${groupItems.length} w tej dostawie`
                  : `Z dostawy ${formatFullDate(item.date)}`
                : isJournalItem
                  ? `${journalStageLabel(item.journalStage)} · ${formatFullDate(item.date)}`
                  : `${firingLabel(item.firing)} · ${formatDate(item.date)}`
            }</p>
          </div>
        </div>
        <div class="item-meta">
          ${
            isStudentItem || isJournalItem
              ? `<span class="recipe-indicator ${recipeCount ? "filled" : ""}">${recipeCount ? "Ma notatkę zdobienia" : "Dodaj notatkę"}</span>
                 <span class="group-pill">${formatDate(item.date)}</span>`
              : `<span class="owner-pill">${item.owner}</span>
                 <span class="group-pill">${item.group}</span>`
          }
        </div>
      </div>
    </article>
  `;
}

function journalStageLabel(stage) {
  return stage === "finished" ? "Gotowy" : "W trakcie";
}

function instructorCeramicsView() {
  const items = state.items
    .filter((item) => item.ownerId === currentInstructorId())
    .filter(
      (item) =>
        state.instructorPersonalFilter === "all" ||
        item.status === state.instructorPersonalFilter,
    )
    .sort((a, b) => {
      const priority = { ready: 0, waiting: 1, collected: 2 };
      return priority[a.status] - priority[b.status] || b.date.localeCompare(a.date);
    });
  const allItems = state.items.filter((item) => item.ownerId === currentInstructorId());
  const filters = [
    ["all", "Wszystkie"],
    ["ready", "Do odbioru"],
    ["waiting", "Czekają"],
    ["collected", "Odebrane"],
  ];

  return `
    <div class="student-items-page instructor-own-items">
      <div class="page-head my-items-head">
        <div>
          <p class="eyebrow">Prywatna przestrzeń instruktora</p>
          <h1>Moja ceramika</h1>
        </div>
        <button class="primary-button my-items-add" id="open-add-flow" type="button"><span class="button-icon">+</span> <span>Dodaj</span></button>
      </div>
      <div class="my-items-navigation">
        <span>${allItems.length} ${pluralItems(allItems.length)}</span>
      </div>
      <div class="my-items-filter-row" aria-label="Filtr statusu">
        ${filters
          .map(
            ([id, label]) =>
              `<button class="filter-chip quiet-filter status-filter ${id} ${state.instructorPersonalFilter === id ? "active" : ""}" data-personal-filter="${id}" type="button">${label}</button>`,
          )
          .join("")}
      </div>
      <p class="gallery-gesture-hint">Przytrzymaj zdjęcie, aby otworzyć podgląd.</p>
      ${
        items.length
          ? studentGallerySections(items)
          : emptyState("Tu jest pusto", "Zmień filtr albo dodaj nowy wyrób.")
      }
    </div>
    <article class="catalog-teaser journal-catalog-teaser">
      <div>
        <p class="eyebrow">Wspólna biblioteka</p>
        <h2>Porównaj swoje efekty z innymi</h2>
      </div>
      <div class="instructor-library-actions">
        <button class="secondary-button mobile-personal-combinations" data-view="combinations" type="button">Moje kombinacje</button>
        <button class="secondary-button" data-view="glazes" type="button">Wspólne kombinacje</button>
      </div>
    </article>
  `;
}

function glazeCatalogView() {
  const selectedGlazeBrands = state.catalogGlazeBrands || [];
  const selectedGlazes = state.catalogGlazes || [];
  const selectedClayBrands = state.catalogClayBrands || [];
  const selectedClays = state.catalogClays || [];
  const glazeBrands = [...new Set(initialGlazes.map((glaze) => glaze.brand))].sort((a, b) =>
    a.localeCompare(b, "pl"),
  );
  const clayBrands = [...new Set(initialClays.map((clay) => clay.brand))];
  const results = catalogResults();
  const selectionSummary = catalogSelectionSummary();
  const selectionCount =
    selectedGlazeBrands.length +
    selectedGlazes.length +
    selectedClayBrands.length +
    selectedClays.length;

  return `
    <div class="page-head catalog-page-head">
      <div>
        <p class="eyebrow">Społeczność Malina Ceramik</p>
        <h1>Biblioteka szkliw</h1>
      </div>
    </div>
    <div class="catalog-identity">
      <div class="catalog-identity-icon">${icon("palette")}</div>
      <div>
        <strong>Efekty szkliw pracowni i kursantów</strong>
      </div>
    </div>
    <div class="catalog-community-preview">
      <span>W przyszłości</span>
      <strong>Oceny i kombinacja miesiąca</strong>
    </div>
    <div class="catalog-notice">
      <strong>Każdy wypał może wyglądać trochę inaczej.</strong>
      <span>Na efekt wpływają glina, liczba warstw, temperatura i miejsce w piecu.</span>
    </div>
    <section class="material-filter-panel">
      <div class="catalog-filter-columns">
        <div class="catalog-filter-path">
          ${catalogFilterGroup(
            "Marka szkliwa",
            glazeBrands,
            selectedGlazeBrands,
            "glaze-brand",
          )}
          ${
            selectedGlazeBrands.length
              ? catalogBrandOptionGroups(
                  selectedGlazeBrands,
                  initialGlazes,
                  selectedGlazes,
                  "glaze",
                )
              : ""
          }
        </div>
        <div class="catalog-filter-path">
          ${catalogFilterGroup(
            "Marka gliny",
            clayBrands,
            selectedClayBrands,
            "clay-brand",
          )}
          ${
            selectedClayBrands.length
              ? catalogBrandOptionGroups(
                  selectedClayBrands,
                  initialClays,
                  selectedClays,
                  "clay",
                )
              : ""
          }
        </div>
      </div>
      ${
        selectionCount
          ? `<button class="text-button catalog-clear" id="clear-catalog-filters" type="button" aria-label="Wyczyść wszystkie filtry">Wyczyść</button>`
          : ""
      }
    </section>
    <section class="catalog-results">
      <div class="catalog-results-head">
        <div>
          <p class="eyebrow">Efekty społeczności</p>
          <h2>${selectionCount ? "Wyroby pasujące do wyboru" : "Wszystkie skatalogowane wyroby"}</h2>
          ${selectionSummary ? `<p>${selectionSummary}</p>` : ""}
        </div>
        <span>${results.length} ${pluralItems(results.length)}</span>
      </div>
      ${
        results.length
          ? `<div class="catalog-results-grid">${results.map(catalogResultCard).join("")}</div>`
          : emptyState(
              "Nie mamy jeszcze takiej kombinacji",
              "W katalogu nie ma wyrobu spełniającego wszystkie zaznaczone warunki. Zmień jedną z fasolek albo wyczyść filtry.",
            )
      }
    </section>
  `;
}

function catalogBrandOptionGroups(brands, materials, selected, type) {
  return `
    <div class="catalog-brand-options">
      ${brands
        .map((brand) => {
          const options = materials
            .filter((material) => material.brand === brand)
            .map((material) => ({
              value: material.id,
              label: `${material.code} · ${material.name}`,
            }));
          return `
            <div class="catalog-brand-models brand-themed" style="${brandThemeStyle(brand, type)}" data-catalog-kind="${type}" data-catalog-brand-group="${escapeHtml(brand)}">
              <h4>${escapeHtml(brand)}</h4>
              ${catalogChipList(options, selected, type, brand)}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function catalogFilterGroup(title, options, selected, type) {
  const normalizedOptions = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );
  return `
    <div class="catalog-filter-group">
      <h3>${title}</h3>
      ${catalogChipList(normalizedOptions, selected, type)}
    </div>
  `;
}

function catalogChipList(options, selected, type, fixedBrand = null) {
  return `
    <div class="catalog-chip-list">
      ${options
        .map((option) => {
          const brand =
            fixedBrand ||
            (type === "glaze-brand" || type === "clay-brand" ? option.value : null);
          return `<button class="catalog-chip ${brand ? "brand-themed" : ""} ${selected.includes(option.value) ? "active" : ""}" ${brand ? `style="${brandThemeStyle(brand, type)}"` : ""} data-catalog-filter="${type}" data-catalog-value="${escapeHtml(option.value)}" type="button">${escapeHtml(option.label)}</button>`;
        })
        .join("")}
    </div>
  `;
}

function brandThemeStyle(brand, type) {
  const themes = {
    Amaco: ["#fcf5f1", "#e8c7b8", "#765548"],
    Botz: ["#f3f8fa", "#bed4df", "#4f6977"],
    "G&S": ["#f4f8f3", "#c5d6c2", "#536a52"],
    Silbeco: ["#f7f4f9", "#d6c9df", "#695b72"],
  };
  const fallback = type.startsWith("clay")
    ? ["#faf7f0", "#ded2b9", "#6b604a"]
    : ["#f5f8f5", "#ccd7cc", "#526252"];
  const [background, border, color] = themes[brand] || fallback;
  return `--brand-bg:${background};--brand-border:${border};--brand-text:${color}`;
}

function glazeByName(name) {
  return initialGlazes.find((glaze) => glaze.name === name);
}

function clayByName(name) {
  return initialClays.find((clay) => clay.name === name);
}

function catalogResults() {
  const glazeBrands = state.catalogGlazeBrands || [];
  const glazeIds = state.catalogGlazes || [];
  const clayBrands = state.catalogClayBrands || [];
  const clayIds = state.catalogClays || [];

  return state.items
    .filter((item) => {
      const recipe = normalizeRecipe(item.recipe);
      const sharing = normalizeSharing(item.sharing);
      return (
        sharing.combination &&
        sharing.imageIds.length &&
        sharedCatalogImage(item) &&
        recipe.glazes.length &&
        recipe.clay.length
      );
    })
    .filter((item) => {
      const recipe = normalizeRecipe(item.recipe);
      const itemGlazes = recipe.glazes.map(glazeByName).filter(Boolean);
      const itemClays = recipe.clay.map(clayByName).filter(Boolean);
      if (
        glazeBrands.length &&
        !itemGlazes.some((glaze) => glazeBrands.includes(glaze.brand))
      ) {
        return false;
      }
      if (glazeIds.length && !itemGlazes.some((glaze) => glazeIds.includes(glaze.id))) {
        return false;
      }
      if (
        clayBrands.length &&
        !itemClays.some((clay) => clayBrands.includes(clay.brand))
      ) {
        return false;
      }
      if (clayIds.length && !itemClays.some((clay) => clayIds.includes(clay.id))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function catalogSelectionSummary() {
  const parts = [];
  const glazeBrands = state.catalogGlazeBrands || [];
  const glazeIds = state.catalogGlazes || [];
  const clayBrands = state.catalogClayBrands || [];
  const clayIds = state.catalogClays || [];
  if (glazeBrands.length) parts.push(`marka szkliwa: ${glazeBrands.join(", ")}`);
  if (glazeIds.length) {
    parts.push(
      `szkliwo: ${glazeIds
        .map((id) => initialGlazes.find((glaze) => glaze.id === id)?.code)
        .filter(Boolean)
        .join(", ")}`,
    );
  }
  if (clayBrands.length) parts.push(`marka gliny: ${clayBrands.join(", ")}`);
  if (clayIds.length) {
    parts.push(
      `glina: ${clayIds
        .map((id) => initialClays.find((clay) => clay.id === id)?.code)
        .filter(Boolean)
        .join(", ")}`,
    );
  }
  return parts.length ? `Aktywne filtry: ${parts.join(" · ")}` : "";
}

function catalogResultCard(item) {
  const recipe = normalizeRecipe(item.recipe);
  const sharing = normalizeSharing(item.sharing);
  const glazeLabels = recipe.glazes
    .map(glazeByName)
    .filter(Boolean);
  const clayLabels = recipe.clay
    .map(clayByName)
    .filter(Boolean);
  return `
    <article class="catalog-result-card">
      <img src="${sharedCatalogImage(item)}" alt="Udostępniony skatalogowany wyrób" />
      <div class="catalog-result-body">
        <span class="catalog-result-source">Udostępniona realizacja</span>
        <h3>Wyrób z ${formatFullDate(item.date)}</h3>
        <div class="catalog-result-tags">
          ${glazeLabels
            .map(
              (glaze) =>
                `<span class="brand-themed" style="${brandThemeStyle(glaze.brand, "glaze")}">${glaze.brand} ${glaze.code}</span>`,
            )
            .join("")}
          ${clayLabels
            .map(
              (clay) =>
                `<span class="brand-themed" style="${brandThemeStyle(clay.brand, "clay")}">${clay.brand} ${clay.code}</span>`,
            )
            .join("")}
        </div>
        <p>${sharing.note && recipe.note ? escapeHtml(recipe.note) : "Udostępniony przykład efektu po wypale."}</p>
      </div>
    </article>
  `;
}

function studentHistory() {
  const payments = state.payments.filter((payment) => payment.owner === "Anna Kowalska");
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Twoje rozliczenia</p>
        <h1>Historia</h1>
        <p class="lead">Odbiory i płatności w jednym miejscu.</p>
      </div>
    </div>
    <section class="panel">
      <div class="history-list">
        ${
          payments.length
            ? payments.map(historyRow).join("")
            : emptyState("Jeszcze bez rozliczeń", "Pierwsze rozliczenie pojawi się tu po odbiorze ceramiki.")
        }
      </div>
    </section>
  `;
}

function notificationsView() {
  if (liveMode) {
    const notifications = (state.notifications || [])
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt);
    return `
      <div class="page-head notification-page-head">
        <div>
          <p class="eyebrow">Wiadomości z pracowni</p>
          <h1>Powiadomienia</h1>
        </div>
        <button class="secondary-button" id="enable-push" type="button">
          ${typeof Notification !== "undefined" && Notification.permission === "granted" ? "Powiadomienia włączone" : "Włącz powiadomienia"}
        </button>
      </div>
      <section class="panel">
        <div class="history-list">
          ${
            notifications.length
              ? notifications
                  .map(
                    (notification) => `
                      <div class="history-row">
                        <div class="history-icon">${icon("bell")}</div>
                        <div>
                          <strong>${escapeHtml(notification.title)}</strong>
                          <small>${escapeHtml(notification.body)} · ${new Intl.DateTimeFormat("pl-PL", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(notification.createdAt))}</small>
                        </div>
                        <span class="status-pill ready">${notification.actorName === currentInstructorName() ? "Twoje" : "Nowe"}</span>
                      </div>`,
                  )
                  .join("")
              : emptyState("Spokojnie w pracowni", "Nowe zdarzenia pojawią się tutaj.")
          }
        </div>
      </section>`;
  }
  const ownerId = state.role === "student" ? "anna" : currentInstructorId();
  const ready = state.items.filter(
    (item) => item.ownerId === ownerId && !item.personalJournal && item.status === "ready",
  );
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Wiadomości z pracowni</p>
        <h1>Powiadomienia</h1>
        <p class="lead">Najważniejsze informacje o Twoich wyrobach, bez zbędnego hałasu.</p>
      </div>
    </div>
    <section class="panel">
      <div class="history-list">
        ${
          ready.length
            ? ready
                .map(
                  (item) => `
                    <div class="history-row">
                      <div class="history-icon">${icon("bell")}</div>
                      <div>
                        <strong>${studentItemLabel(item)} jest gotowy do odbioru</strong>
                        <small>Wypalono ${formatDate(item.firedAt || "2026-06-08")} · ${firingLabel(item.firing)}</small>
                      </div>
                      <span class="status-pill ready">Nowe</span>
                    </div>`,
                )
                .join("")
            : emptyState("Wszystko przeczytane", "Nowe wiadomości pojawią się tutaj.")
        }
      </div>
    </section>
  `;
}

function instructorGallery() {
  const filtered = state.items
    .filter((item) => !item.personalJournal)
    .filter((item) => state.instructorStatus === "all" || item.status === state.instructorStatus)
    .filter((item) => state.instructorFiring === "all" || item.firing === state.instructorFiring)
    .filter((item) => `${itemLabel(item)} ${itemCode(item)} ${item.owner} ${item.group}`.toLowerCase().includes(state.search.toLowerCase()))
    .sort((a, b) => a.date.localeCompare(b.date));
  const statusFilters = [
    ["all", "Wszystkie"],
    ["waiting", "Czekają na wypał"],
    ["ready", "Do odbioru"],
    ["collected", "Odebrane"],
  ];
  const firingFilters = [
    ["all", "Każdy wypał"],
    ["bisque", "Biskwit"],
    ["glaze", "Na ostro"],
  ];

  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Widok instruktora</p>
        <h1>Ceramika w pracowni</h1>
        <p class="lead">Najstarsze wyroby są pierwsze.</p>
      </div>
    </div>

    <div class="instructor-toolbar">
      <div class="field search-field">
        <label for="search-items">Szukaj kursanta, wyrobu lub dostawy</label>
        <input class="input" id="search-items" type="search" placeholder="np. Anna lub Dostawa 03.06" value="${state.search}" />
      </div>
      <div class="filter-control">
        <span class="filter-label">Status</span>
        <div class="filter-row compact">
          ${statusFilters
            .map(
              ([id, label]) =>
                `<button class="filter-chip status-filter ${id} ${state.instructorStatus === id ? "active" : ""}" data-instructor-status="${id}" type="button">${label}</button>`,
            )
            .join("")}
        </div>
      </div>
      <div class="filter-control">
        <span class="filter-label">Rodzaj wypału</span>
        <div class="filter-row compact">
          ${firingFilters
            .map(
              ([id, label]) =>
                `<button class="filter-chip firing-filter ${id} ${state.instructorFiring === id ? "active" : ""}" data-instructor-firing="${id}" type="button">${label}</button>`,
            )
            .join("")}
        </div>
      </div>
    </div>

    <p class="gallery-gesture-hint">Dotknij zdjęcia, aby je zaznaczyć. Przytrzymaj, aby otworzyć podgląd.</p>
    ${filtered.length ? instructorGallerySections(filtered) : emptyState("Brak pasujących wyrobów", "Zmień filtry lub wyszukiwaną frazę.")}

    ${
      state.selected.length
        ? `
          <div class="bulk-bar">
            <div>
              <strong>Zaznaczono ${state.selected.length} ${pluralItems(state.selected.length)}</strong>
              <small>Każda sztuka zmieni status osobno</small>
            </div>
            <div class="bulk-actions">
              <button class="secondary-button" id="clear-selection" type="button">Anuluj</button>
              <button class="primary-button" id="mark-fired" type="button">Oznacz jako wypalone</button>
            </div>
          </div>`
        : ""
    }
  `;
}

function instructorGallerySections(items) {
  const sections = [
    ["waiting-bisque", "Czekają na biskwit", "Najstarsze sztuki są pokazane jako pierwsze.", (item) => item.status === "waiting" && item.firing === "bisque"],
    ["waiting-glaze", "Czekają na wypał na ostro", "Wyroby szkliwione oczekujące na wypał.", (item) => item.status === "waiting" && item.firing === "glaze"],
    ["ready", "Gotowe do odbioru", "Wypalone wyroby oczekujące na kursantów.", (item) => item.status === "ready"],
    ["collected", "Odebrane", "Wyroby, które opuściły już pracownię.", (item) => item.status === "collected"],
  ];

  return sections
    .map(([id, title, copy, matcher]) =>
      gallerySection(title, copy, items.filter(matcher), true, id),
    )
    .join("");
}

function settlementsView() {
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Odbiór i płatność</p>
        <h1>Rozliczenie ceramiki</h1>
        <p class="lead">Wpisz wagę. Kwota policzy się automatycznie według aktualnych stawek.</p>
      </div>
    </div>
    <div class="settlement-layout">
      <section class="panel settlement-form">
        <div class="field">
          <label for="settlement-client">Kursant</label>
          <select class="select" id="settlement-client">
            <option>Anna Kowalska</option>
            <option>Marek Piotrowski</option>
            <option>Zofia Malinowska</option>
          </select>
        </div>
        <div class="weight-row">
          <div class="field">
            <label for="bisque-weight">Biskwit · 28 zł/kg</label>
            <input class="input weight-input" id="bisque-weight" type="number" inputmode="decimal" min="0" step="0.1" value="0" />
          </div>
          <div class="field">
            <label for="glaze-weight">Na ostro · 45 zł/kg</label>
            <input class="input weight-input" id="glaze-weight" type="number" inputmode="decimal" min="0" step="0.1" value="0" />
          </div>
        </div>
        <div class="recognition-note">
          <strong>Co stanie się po zapisaniu?</strong>
          <p>Rozliczenie trafi do historii kursanta, a odebrane wyroby będzie można przenieść do archiwum. W docelowej wersji te dane trafią też do Arkusza Google.</p>
        </div>
      </section>
      <aside class="price-summary">
        <div>
          <p class="eyebrow">Podsumowanie</p>
          <div class="price-lines">
            <div class="price-line"><span>Biskwit</span><strong id="bisque-price">0,00 zł</strong></div>
            <div class="price-line"><span>Na ostro</span><strong id="glaze-price">0,00 zł</strong></div>
          </div>
        </div>
        <div>
          <div class="price-total">
            <small>Do zapłaty</small>
            <strong id="total-price">0,00 zł</strong>
          </div>
          <button class="primary-button" id="save-settlement" type="button">Zapisz rozliczenie</button>
        </div>
      </aside>
    </div>
    <div class="section-head"><div><h2>Ostatnie rozliczenia</h2></div></div>
    <section class="panel">
      <div class="history-list">${state.payments.map(historyRow).join("")}</div>
    </section>
  `;
}

function historyRow(payment) {
  return `
    <div class="history-row">
      <div class="history-icon">${icon("money")}</div>
      <div>
        <strong>${payment.owner}</strong>
        <small>${formatDate(payment.date)} · ${payment.bisque} kg biskwit · ${payment.glaze} kg na ostro</small>
      </div>
      <span class="history-amount">${formatMoney(payment.total)}</span>
    </div>`;
}

function clientsView() {
  const clients = [
    ["Anna Kowalska", "anna"],
    ["Marek Piotrowski", "marek"],
    ["Zofia Malinowska", "zofia"],
  ];
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Baza pracowni</p>
        <h1>Kursanci</h1>
        <p class="lead">Szybki podgląd ceramiki i ostatniej aktywności każdej osoby.</p>
      </div>
    </div>
    <section class="panel">
      <div class="history-list">
        ${clients
          .map(([name, id]) => {
            const items = state.items.filter((item) => !item.personalJournal && item.ownerId === id);
            const waiting = items.filter((item) => item.status === "waiting").length;
            return `
              <div class="history-row">
                <div class="avatar">${name.split(" ").map((part) => part[0]).join("")}</div>
                <div><strong>${name}</strong><small>${items.length} ${pluralItems(items.length)} · ${waiting} czeka na wypał</small></div>
                <button class="ghost-button client-filter" data-client="${name}" type="button">Pokaż wyroby →</button>
              </div>`;
          })
          .join("")}
      </div>
    </section>
  `;
}

function instructorArchive() {
  const archived = state.items.filter((item) => !item.personalJournal && item.status === "collected");
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Zamknięte sprawy</p>
        <h1>Archiwum</h1>
        <p class="lead">Odebrane wyroby i ich pełna historia pozostają łatwe do odnalezienia.</p>
      </div>
    </div>
    <p class="gallery-gesture-hint">Przytrzymaj zdjęcie, aby otworzyć podgląd.</p>
    <div class="items-grid gallery-grid">
      ${archived.length ? archived.map((item) => itemCard(item, false)).join("") : emptyState("Archiwum jest puste", "Odebrane wyroby pojawią się tutaj.")}
    </div>
  `;
}

function emptyState(title, copy) {
  return `<div class="empty-state"><strong>${title}</strong><span>${copy}</span></div>`;
}

function attachViewListeners() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      state.selected = [];
      saveState();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelector("#open-add-flow")?.addEventListener("click", openAddFlow);
  document
    .querySelector("#open-journal-flow")
    ?.addEventListener("click", () => openJournalFlow("instructor"));
  document
    .querySelector("#open-combination-flow")
    ?.addEventListener("click", () => openJournalFlow("student"));

  document.querySelectorAll("[data-stat-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.studentFilter = button.dataset.statFilter;
      state.studentItemsTab = "studio";
      state.view = "my-items";
      saveState();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-student-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.studentFilter = button.dataset.studentFilter;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-personal-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.instructorPersonalFilter = button.dataset.personalFilter;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-items-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.studentItemsTab = button.dataset.itemsTab;
      if (state.studentItemsTab !== "studio") state.studentFilter = "all";
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-combination-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.combinationFilter =
        state.combinationFilter === button.dataset.combinationFilter
          ? "all"
          : button.dataset.combinationFilter;
      saveState();
      render();
    });
  });

  document.querySelector("#start-combination-sharing")?.addEventListener("click", () => {
    const ownerId = state.role === "student" ? "anna" : currentInstructorId();
    combinationShareMode = true;
    combinationShareSelection = state.items
      .filter((item) => item.ownerId === ownerId && isCombinationShared(item))
      .map((item) => item.id);
    state.combinationFilter = "all";
    render();
  });

  document.querySelector("#cancel-combination-sharing")?.addEventListener("click", () => {
    combinationShareMode = false;
    combinationShareSelection = [];
    render();
  });

  document.querySelector("#save-combination-sharing")?.addEventListener("click", () => {
    const ownerId = state.role === "student" ? "anna" : currentInstructorId();
    state.items = state.items.map((item) => {
      if (item.ownerId !== ownerId || !isCombinationCategorized(item)) return item;
      const sharing = normalizeSharing(item.sharing);
      const selected = combinationShareSelection.includes(item.id);
      return {
        ...item,
        sharing: {
          ...sharing,
          combination: selected,
          imageIds:
            selected && !sharing.imageIds.length
              ? [normalizeFinalImages(item.finalImages).at(-1)?.id || "before"]
              : sharing.imageIds,
        },
      };
    });
    combinationShareMode = false;
    combinationShareSelection = [];
    saveState();
    render();
    showToast("Udostępnianie kombinacji zostało zapisane.");
  });

  document.querySelectorAll("[data-catalog-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleCatalogFilter(button.dataset.catalogFilter, button.dataset.catalogValue);
      saveState();
      render();
    });
  });

  document.querySelector("#clear-catalog-filters")?.addEventListener("click", () => {
    state.catalogGlazeBrands = [];
    state.catalogGlazes = [];
    state.catalogClayBrands = [];
    state.catalogClays = [];
    saveState();
    render();
  });

  attachGalleryInteractions();

  document.querySelector("#clear-selection")?.addEventListener("click", () => {
    state.selected = [];
    render();
  });

  document.querySelector("#mark-fired")?.addEventListener("click", openFiredConfirmation);

  const search = document.querySelector("#search-items");
  search?.addEventListener("input", (event) => {
    state.search = event.target.value;
    saveState();
    render();
    const nextSearch = document.querySelector("#search-items");
    nextSearch?.focus();
    nextSearch?.setSelectionRange(state.search.length, state.search.length);
  });

  document.querySelectorAll("[data-instructor-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.instructorStatus = button.dataset.instructorStatus;
      state.selected = [];
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-instructor-firing]").forEach((button) => {
    button.addEventListener("click", () => {
      state.instructorFiring = button.dataset.instructorFiring;
      state.selected = [];
      saveState();
      render();
    });
  });

  document.querySelectorAll(".weight-input").forEach((input) => {
    input.addEventListener("input", updatePrice);
  });
  document.querySelector("#save-settlement")?.addEventListener("click", saveSettlement);
  document.querySelector("#enable-push")?.addEventListener("click", enablePushNotifications);

  document.querySelectorAll(".client-filter").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = "gallery";
      state.instructorStatus = "all";
      state.search = button.dataset.client;
      saveState();
      render();
    });
  });
}

async function enablePushNotifications() {
  const button = document.querySelector("#enable-push");
  try {
    button.disabled = true;
    button.textContent = "Włączanie...";
    if (!serviceWorkerRegistration) {
      serviceWorkerRegistration = await navigator.serviceWorker.ready;
    }
    await liveBackend.enablePushNotifications(serviceWorkerRegistration);
    showToast("Powiadomienia systemowe zostały włączone.");
    render();
  } catch (error) {
    showToast(error.message || "Nie udało się włączyć powiadomień.");
    button.disabled = false;
    button.textContent = "Włącz powiadomienia";
  }
}

function publishStudioEvent({ type, title, body, itemIds = [] }) {
  if (!liveMode) return;
  const notification = {
    id: `notification-${Date.now()}-${crypto.randomUUID()}`,
    type,
    title,
    body,
    itemIds,
    actorUid: liveUser?.uid || "",
    actorName: currentInstructorName(),
    createdAt: Date.now(),
  };
  state.notifications = [notification, ...(state.notifications || [])].slice(0, 100);
  liveBackend.publishNotification({
    type,
    title,
    body,
    itemIds,
    url: location.href,
  }).catch(() => {
    showToast("Zmiana została zapisana, ale push nie został wysłany.");
  });
}

function toggleCatalogFilter(type, value) {
  const stateKeys = {
    "glaze-brand": "catalogGlazeBrands",
    glaze: "catalogGlazes",
    "clay-brand": "catalogClayBrands",
    clay: "catalogClays",
  };
  const key = stateKeys[type];
  if (!key) return;
  const current = state[key] || [];
  state[key] = current.includes(value)
    ? current.filter((candidate) => candidate !== value)
    : [...current, value];

  if (type === "glaze-brand") {
    state.catalogGlazes = (state.catalogGlazes || []).filter((id) => {
      const glaze = initialGlazes.find((candidate) => candidate.id === id);
      return glaze && state.catalogGlazeBrands.includes(glaze.brand);
    });
  }
  if (type === "clay-brand") {
    state.catalogClays = (state.catalogClays || []).filter((id) => {
      const clay = initialClays.find((candidate) => candidate.id === id);
      return clay && state.catalogClayBrands.includes(clay.brand);
    });
  }
}

function attachGalleryInteractions() {
  document
    .querySelectorAll(
      ".gallery-grid .item-card, .journal-grid .item-card, .combination-grid .combination-card",
    )
    .forEach((card) => {
    const itemId = Number(card.dataset.itemId);
    const selectable = card.dataset.selectable === "true";
    const shareSelectable = card.dataset.shareSelectable === "true";
    let pressTimer;
    let longPressTriggered = false;
    let startX = 0;
    let startY = 0;

    const cancelPress = () => {
      clearTimeout(pressTimer);
    };

    card.addEventListener("contextmenu", (event) => event.preventDefault());
    card.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      if (shareSelectable) return;
      longPressTriggered = false;
      startX = event.clientX;
      startY = event.clientY;
      pressTimer = setTimeout(() => {
        longPressTriggered = true;
        navigator.vibrate?.(18);
        openItemPreview(itemId);
      }, 520);
    });
    card.addEventListener("pointermove", (event) => {
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 10) cancelPress();
    });
    card.addEventListener("pointerup", cancelPress);
    card.addEventListener("pointercancel", cancelPress);
    card.addEventListener("pointerleave", cancelPress);
    card.addEventListener("click", (event) => {
      if (longPressTriggered) {
        event.preventDefault();
        event.stopPropagation();
        longPressTriggered = false;
        return;
      }
      if (shareSelectable) toggleCombinationShareSelection(itemId);
      else if (selectable) toggleSelection(itemId);
      else openItemPreview(itemId);
    });
    card.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && shareSelectable) {
        event.preventDefault();
        toggleCombinationShareSelection(itemId);
      } else if (event.key === "Enter" && !selectable) {
        event.preventDefault();
        openItemPreview(itemId);
      } else if ((event.key === "Enter" || event.key === " ") && selectable) {
        event.preventDefault();
        toggleSelection(itemId);
      }
    });
    });
}

function toggleCombinationShareSelection(itemId) {
  combinationShareSelection = combinationShareSelection.includes(itemId)
    ? combinationShareSelection.filter((id) => id !== itemId)
    : [...combinationShareSelection, itemId];
  render();
}

function openItemPreview(itemId) {
  const item = state.items.find((candidate) => candidate.id === itemId);
  if (!item) return;
  const editable = canEditItem(item);
  const isStudentItem = isOwnItem(item) && !item.personalJournal;
  const isJournalItem = state.role === "instructor" && item.personalJournal;
  const isPersonalEntry = item.personalJournal && editable;
  const previewItems = previewNavigationItems(item);
  const previewIndex = previewItems.findIndex((candidate) => candidate.id === item.id);
  const previousItem = previewItems[(previewIndex - 1 + previewItems.length) % previewItems.length];
  const nextItem = previewItems[(previewIndex + 1) % previewItems.length];
  const canNavigate = previewItems.length > 1;
  const canAddFinal =
    editable &&
    (item.status === "ready" ||
      item.status === "collected" ||
      (item.personalJournal && item.journalStage === "finished"));
  const label = visibleItemLabel(item);
  const finalImages = normalizeFinalImages(item.finalImages);
  const previewImage = displayItemImage(item);
  recipeDraft = {
    itemId,
    ...structuredClone(normalizeRecipe(item.recipe)),
  };
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head preview-modal-head compact">
      <div>
        <p class="eyebrow">${isPersonalEntry ? "Prywatny dziennik ceramiczny" : isStudentItem ? "Twój wyrób" : `Wyrób ${itemCode(item)}`}</p>
        <h2 id="modal-title">${label}</h2>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="preview-photo-stage">
      ${
        canNavigate
          ? `<button class="preview-nav-arrow previous" data-preview-item="${previousItem.id}" type="button" aria-label="Poprzedni wyrób">‹</button>`
          : ""
      }
      <div class="item-preview-photo firing-${item.firing}" id="preview-swipe-area">
        <img id="preview-main-image" src="${previewImage}" alt="${label}, wyrób: ${item.owner}" />
        <div class="preview-history-strip">
          <span>${previewHistoryLine(item, isPersonalEntry)}</span>
        </div>
        <div class="preview-photo-badges">
          <span class="preview-firing-badge ${item.firing}">${firingLabel(item.firing)}</span>
          <span class="status-pill ${item.status}">${isPersonalEntry ? journalStageLabel(item.journalStage) : statusLabel(item.status)}</span>
        </div>
        ${previewPhotoDock(item, canAddFinal)}
      </div>
      ${
        canNavigate
          ? `<button class="preview-nav-arrow next" data-preview-item="${nextItem.id}" type="button" aria-label="Następny wyrób">›</button>`
          : ""
      }
    </div>
    <div class="item-preview-details">
      ${editable ? inlineRecipeEditor(item) : recipeSummary(item)}
      ${(isStudentItem || isJournalItem) && editable ? sharingSection(item) : ""}
    </div>
    <div class="modal-foot preview-modal-foot">
      <button class="secondary-button close-modal" type="button">Zamknij podgląd</button>
      ${isPersonalEntry && item.journalStage !== "finished" ? '<button class="secondary-button" id="mark-journal-finished" type="button">Oznacz jako gotowy</button>' : ""}
      ${editable ? '<button class="primary-button" id="save-inline-recipe" type="button">Zapisz notatkę</button>' : ""}
    </div>`;
  modal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelectorAll("[data-preview-item]").forEach((button) => {
    button.addEventListener("click", () => openItemPreview(Number(button.dataset.previewItem)));
  });
  modal.querySelector("#mark-journal-finished")?.addEventListener("click", () => {
    state.items = state.items.map((candidate) =>
      candidate.id === itemId
        ? { ...candidate, journalStage: "finished", status: "collected", firedAt: "2026-06-11" }
        : candidate,
    );
    saveState();
    openItemPreview(itemId);
    showToast("Wyrób oznaczono jako gotowy. Możesz dodać zdjęcia finalnego efektu.");
  });
  modal.querySelector("#add-final-photo")?.addEventListener("click", () => {
    finalPhotoTargetId = itemId;
    openPhotoSourcePicker("final-photo-input", "final-photo-camera-input");
  });
  modal.querySelectorAll("[data-preview-image]").forEach((button) => {
    button.addEventListener("click", () => selectPreviewImage(button.dataset.previewImage, button));
  });
  modal.querySelectorAll("[data-demo-final-image]").forEach((button) => {
    button.addEventListener("click", () => addFinalImages(itemId, [button.dataset.demoFinalImage]));
  });
  attachInlineRecipeListeners(item);
  attachPreviewSwipe(itemId, previousItem?.id, nextItem?.id, canNavigate);
  modal.querySelector("#toggle-share-combination")?.addEventListener("click", () => {
    updateItemSharing(itemId, (sharing) => ({
      ...sharing,
      combination: !sharing.combination,
      note: sharing.combination ? false : sharing.note,
    }));
  });
  modal.querySelector("#toggle-share-note")?.addEventListener("click", () => {
    updateItemSharing(itemId, (sharing) => ({ ...sharing, note: !sharing.note }));
  });
  modal.querySelectorAll("[data-toggle-share-image]").forEach((button) => {
    button.addEventListener("click", () => {
      const imageId = button.dataset.toggleShareImage;
      updateItemSharing(itemId, (sharing) => ({
        ...sharing,
        imageIds: sharing.imageIds.includes(imageId)
          ? sharing.imageIds.filter((candidate) => candidate !== imageId)
          : [...sharing.imageIds, imageId],
      }));
    });
  });
  openModal();
}

function previewNavigationItems(item) {
  const ownerId = state.role === "student" ? "anna" : item.ownerId;
  const items = state.items
    .filter((candidate) => candidate.ownerId === ownerId)
    .filter((candidate) =>
      item.personalJournal
        ? candidate.personalJournal
        : state.view === "combinations"
          ? candidate.personalJournal ||
            recipeCategories.some(
              (category) => normalizeRecipe(candidate.recipe)[category.id].length,
            ) ||
            normalizeRecipe(candidate.recipe).note
          : !candidate.personalJournal,
    )
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  return items.length ? items : [item];
}

function previewHistoryLine(item, isPersonalEntry) {
  if (isPersonalEntry) {
    return `${formatFullDate(item.date)} · ${journalStageLabel(item.journalStage)} · prywatny wpis`;
  }
  if (isOwnItem(item)) {
    return `${item.group} · ${firingLabel(item.firing)} · numer pomocniczy pracowni ${itemCode(item)}`;
  }
  return `${item.owner} · ${item.group} · ${formatFullDate(item.date)}`;
}

function previewPhotoDock(item, canAddFinal) {
  const finalImages = normalizeFinalImages(item.finalImages);
  if (!finalImages.length) {
    return canAddFinal
      ? `<div class="preview-photo-dock empty">
          <button class="preview-add-photo" id="add-final-photo" type="button">
            <span>+</span><strong>Dodaj zdjęcie po wypale</strong>
          </button>
          ${previewDemoPhotoButtons()}
        </div>`
      : "";
  }
  return `
    <div class="preview-photo-dock">
      <button class="preview-thumb" data-preview-image="${item.image}" type="button">
        <img src="${item.image}" alt="" /><span>Przed wypałem</span>
      </button>
      ${finalImages
        .map(
          (entry, index) => `
            <button class="preview-thumb ${index === finalImages.length - 1 ? "active" : ""}" data-preview-image="${entry.image}" type="button">
              <img src="${entry.image}" alt="" /><span>Efekt ${index + 1}</span>
            </button>`,
        )
        .join("")}
      ${
        canAddFinal
          ? `<button class="preview-add-more" id="add-final-photo" type="button" aria-label="Dodaj kolejne zdjęcie po wypale">+</button>
             ${previewDemoPhotoButtons()}`
          : ""
      }
    </div>
  `;
}

function previewDemoPhotoButtons() {
  return `
    <div class="preview-demo-photos" aria-label="Przykładowe zdjęcia w wersji demo">
      ${["kubek", "miska", "talerz", "wazon"]
        .map(
          (name) =>
            `<button data-demo-final-image="assets/${name}.webp" type="button" aria-label="Dodaj finalne zdjęcie: ${name}"><img src="assets/${name}.webp" alt="" /></button>`,
        )
        .join("")}
    </div>
  `;
}

function selectPreviewImage(image, selectedButton) {
  const mainImage = document.querySelector("#preview-main-image");
  if (!mainImage) return;
  mainImage.src = image;
  document.querySelectorAll(".preview-thumb").forEach((button) => {
    button.classList.toggle("active", button === selectedButton);
  });
}

function attachPreviewSwipe(itemId, previousId, nextId, canNavigate) {
  if (!canNavigate) return;
  const area = document.querySelector("#preview-swipe-area");
  if (!area) return;
  let startX = 0;
  let startY = 0;
  area.addEventListener(
    "touchstart",
    (event) => {
      startX = event.changedTouches[0].clientX;
      startY = event.changedTouches[0].clientY;
    },
    { passive: true },
  );
  area.addEventListener(
    "touchend",
    (event) => {
      const deltaX = event.changedTouches[0].clientX - startX;
      const deltaY = event.changedTouches[0].clientY - startY;
      if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      openItemPreview(deltaX > 0 ? previousId : nextId);
    },
    { passive: true },
  );
}

function finalEffectSection(item, canAddFinal) {
  const finalImages = normalizeFinalImages(item.finalImages);
  return `
    <section class="final-effect-section ${finalImages.length ? "" : "empty"}">
      <div class="final-effect-head">
        <div>
          <small>Przed i po wypale</small>
          <h3>Finalny efekt</h3>
        </div>
        ${finalImages.length ? `<span>${finalImages.length} ${pluralPhotos(finalImages.length)}</span>` : ""}
      </div>
      <div class="before-after-grid">
        <figure>
          <img src="${item.image}" alt="Zdjęcie przed wypałem" />
          <figcaption>Przed wypałem</figcaption>
        </figure>
        ${finalImages
          .map(
            (entry, index) => `
              <figure class="final-effect-photo">
                <img src="${entry.image}" alt="Finalny efekt, zdjęcie ${index + 1}" />
                <figcaption>Efekt finalny · ${formatDate(entry.date)}</figcaption>
                ${
                  canAddFinal
                    ? `<button class="remove-final-photo" data-remove-final-image="${entry.id}" type="button" aria-label="Usuń zdjęcie finalnego efektu ${index + 1}">×</button>`
                    : ""
                }
              </figure>`,
          )
          .join("")}
      </div>
      ${
        canAddFinal
          ? `<div class="final-photo-actions">
              <button class="secondary-button" id="add-final-photo" type="button">${finalImages.length ? "Dodaj kolejne zdjęcie efektu" : "Dodaj zdjęcie po wypale"}</button>
              <div class="demo-final-row" aria-label="Przykładowe zdjęcia w wersji demo">
                <span>Demo:</span>
                ${["kubek", "miska", "talerz", "wazon"]
                  .map(
                    (name) =>
                      `<button data-demo-final-image="assets/${name}.webp" type="button" aria-label="Dodaj finalne zdjęcie: ${name}"><img src="assets/${name}.webp" alt="" /></button>`,
                  )
                  .join("")}
              </div>
            </div>`
          : `<p class="final-effect-hint">${
              item.status === "waiting" && !item.personalJournal
                ? "Zdjęcia finalnego efektu będzie można dodać po zakończeniu wypału."
                : "Właściciel może uzupełnić tę galerię zdjęciami gotowego wyrobu."
            }</p>`
      }
    </section>
  `;
}

async function addFinalImages(itemId, images) {
  const storedImages = [];
  for (const image of images) {
    storedImages.push(
      image.file && liveMode
        ? await liveBackend.uploadImage(image.file, "final")
        : image.image || image,
    );
  }
  state.items = state.items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          finalImages: [
            ...normalizeFinalImages(item.finalImages),
            ...storedImages.map((image) => ({
              id: `final-${Date.now()}-${Math.random().toString(16).slice(2)}`,
              image,
              date: new Date().toISOString().slice(0, 10),
            })),
          ],
        }
      : item,
  );
  saveState();
  openItemPreview(itemId);
  showToast(images.length === 1 ? "Zdjęcie finalnego efektu zostało dodane." : "Zdjęcia finalnego efektu zostały dodane.");
}

function removeFinalImage(itemId, imageId) {
  state.items = state.items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          finalImages: normalizeFinalImages(item.finalImages).filter((entry) => entry.id !== imageId),
          sharing: {
            ...normalizeSharing(item.sharing),
            imageIds: normalizeSharing(item.sharing).imageIds.filter((id) => id !== imageId),
          },
        }
      : item,
  );
  saveState();
  openItemPreview(itemId);
  showToast("Zdjęcie finalnego efektu zostało usunięte.");
}

function recipeSummary(item) {
  const recipe = normalizeRecipe(item.recipe);
  const hasRecipe =
    recipeCategories.some((category) => recipe[category.id].length) || recipe.note.trim();
  return `
    <section class="recipe-summary ${hasRecipe ? "" : "empty"}">
      <div class="recipe-summary-head">
        <div>
          <small>Moja receptura</small>
          <h3>Notatka zdobienia</h3>
        </div>
        ${hasRecipe ? '<span class="recipe-saved">Zapisana</span>' : ""}
      </div>
      ${
        hasRecipe
          ? `<div class="recipe-summary-groups">
              ${recipeCategories
                .map(
                  (category) => `
                    <div>
                      <small>${category.label}</small>
                      <p>${recipe[category.id].length ? recipe[category.id].map((value) => `<span>${escapeHtml(value)}</span>`).join("") : "<em>Nie zapisano</em>"}</p>
                    </div>`,
                )
                .join("")}
            </div>
            ${recipe.note ? `<blockquote>${escapeHtml(recipe.note)}</blockquote>` : ""}`
          : `<p>Dodaj glinę, szkliwa, farby i temperaturę. Przy następnym wyrobie łatwo odnajdziesz sprawdzoną kombinację.</p>`
      }
    </section>
  `;
}

function inlineRecipeEditor(item) {
  return `
    <section class="inline-recipe">
      <div class="inline-recipe-categories">
        ${recipeCategories.map(inlineRecipeCategory).join("")}
      </div>
      <label class="recipe-note-field inline-note-field">
        <span>Notatka</span>
        <textarea id="inline-recipe-note" rows="3" placeholder="np. 3 cienkie warstwy, nakładane pędzlem">${escapeHtml(recipeDraft.note)}</textarea>
      </label>
    </section>
  `;
}

function inlineRecipeCategory(category) {
  const options = [
    ...materialOptions[category.id],
    ...(state.customMaterialOptions?.[category.id] || []),
  ];
  return `
    <fieldset class="inline-recipe-category" data-inline-category="${category.id}">
      <legend>${category.label}</legend>
      <div class="recipe-chip-list">
        ${[...new Set(options)]
          .map(
            (option) =>
              `<button class="recipe-chip ${recipeDraft[category.id].includes(option) ? "active" : ""}" data-inline-recipe-option="${escapeHtml(option)}" data-inline-recipe-category="${category.id}" type="button" aria-pressed="${recipeDraft[category.id].includes(option)}">${escapeHtml(option)}</button>`,
          )
          .join("")}
        <button class="recipe-chip custom-add-chip" data-expand-inline-custom="${category.id}" type="button">+ Dodaj</button>
      </div>
      <div class="inline-custom-form" data-inline-custom-form="${category.id}">
        <input class="input" data-inline-custom-brand="${category.id}" type="text" placeholder="Marka / producent" />
        <input class="input" data-inline-custom-name="${category.id}" type="text" placeholder="Nazwa / numer" />
        <button class="secondary-button" data-save-inline-custom="${category.id}" type="button">Dodaj fasolkę</button>
      </div>
    </fieldset>
  `;
}

function attachInlineRecipeListeners(item) {
  document.querySelectorAll("[data-inline-recipe-option]").forEach(bindInlineRecipeOption);
  document.querySelectorAll("[data-expand-inline-custom]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.expandInlineCustom;
      const form = document.querySelector(`[data-inline-custom-form="${category}"]`);
      form?.classList.toggle("expanded");
      form?.querySelector("input")?.focus();
    });
  });
  document.querySelectorAll("[data-save-inline-custom]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.saveInlineCustom;
      const brand = document
        .querySelector(`[data-inline-custom-brand="${category}"]`)
        ?.value.trim();
      const name = document
        .querySelector(`[data-inline-custom-name="${category}"]`)
        ?.value.trim();
      const value = [brand, name].filter(Boolean).join(" · ");
      if (!value) return;
      const config = recipeCategories.find((candidate) => candidate.id === category);
      if (!state.customMaterialOptions[category].includes(value)) {
        state.customMaterialOptions[category].push(value);
      }
      recipeDraft[category] = config.multiple
        ? [...new Set([...recipeDraft[category], value])]
        : [value];
      saveState();
      const fieldset = button.closest(".inline-recipe-category");
      if (!config.multiple) {
        fieldset?.querySelectorAll("[data-inline-recipe-option]").forEach((candidate) => {
          candidate.classList.remove("active");
          candidate.setAttribute("aria-pressed", "false");
        });
      }
      const addChip = fieldset?.querySelector(".custom-add-chip");
      const newChip = document.createElement("button");
      newChip.className = "recipe-chip active";
      newChip.type = "button";
      newChip.textContent = value;
      newChip.dataset.inlineRecipeOption = value;
      newChip.dataset.inlineRecipeCategory = category;
      newChip.setAttribute("aria-pressed", "true");
      fieldset?.querySelector(".recipe-chip-list")?.insertBefore(newChip, addChip || null);
      bindInlineRecipeOption(newChip);
      fieldset?.querySelector(".inline-custom-form")?.classList.remove("expanded");
      showToast("Nowa fasolka została dodana.");
    });
  });
  document.querySelector("#save-inline-recipe")?.addEventListener("click", () => {
    const note = document.querySelector("#inline-recipe-note")?.value.trim() || "";
    state.items = state.items.map((candidate) =>
      candidate.id === item.id
        ? {
            ...candidate,
            recipe: {
              clay: recipeDraft.clay,
              glazes: recipeDraft.glazes,
              paints: recipeDraft.paints,
              temperature: recipeDraft.temperature,
              note,
            },
          }
        : candidate,
    );
    saveState();
    openItemPreview(item.id);
    showToast("Notatka wyrobu została zapisana.");
  });
}

function bindInlineRecipeOption(button) {
  button.addEventListener("click", () => {
    const category = button.dataset.inlineRecipeCategory;
    const value = button.dataset.inlineRecipeOption;
    const config = recipeCategories.find((candidate) => candidate.id === category);
    const selected = recipeDraft[category].includes(value);
    if (config.multiple) {
      recipeDraft[category] = selected
        ? recipeDraft[category].filter((candidate) => candidate !== value)
        : [...recipeDraft[category], value];
      button.classList.toggle("active", !selected);
      button.setAttribute("aria-pressed", String(!selected));
    } else {
      recipeDraft[category] = selected ? [] : [value];
      document
        .querySelectorAll(`[data-inline-recipe-category="${category}"]`)
        .forEach((candidate) => {
          const active = !selected && candidate.dataset.inlineRecipeOption === value;
          candidate.classList.toggle("active", active);
          candidate.setAttribute("aria-pressed", String(active));
        });
    }
  });
}

function sharingSection(item) {
  const sharing = normalizeSharing(item.sharing);
  const recipe = normalizeRecipe(item.recipe);
  const finalImages = normalizeFinalImages(item.finalImages);
  const hasMaterials = recipeCategories.some((category) => recipe[category.id].length);
  const published = sharing.combination && sharing.imageIds.length;
  return `
    <section class="sharing-section">
      <div class="sharing-section-head">
        <div>
          <small>Wspólny katalog pracowni</small>
          <h3>Co chcesz udostępnić?</h3>
        </div>
        <span class="sharing-badge ${published ? "shared" : "private"}">${published ? "Udostępnione" : "Prywatne"}</span>
      </div>
      <p>Twój wpis i zdjęcia są prywatne. Do katalogu trafią tylko elementy, które wybierzesz poniżej.</p>
      <div class="sharing-options">
        <button class="sharing-toggle ${sharing.combination ? "active" : ""}" id="toggle-share-combination" type="button" ${hasMaterials ? "" : "disabled"}>
          <span class="sharing-check">${sharing.combination ? "✓" : ""}</span>
          <span><strong>Kombinacja materiałów</strong><small>Glina, szkliwa, farby i temperatura</small></span>
        </button>
        <button class="sharing-toggle ${sharing.note ? "active" : ""}" id="toggle-share-note" type="button" ${sharing.combination && recipe.note ? "" : "disabled"}>
          <span class="sharing-check">${sharing.note ? "✓" : ""}</span>
          <span><strong>Treść mojej notatki</strong><small>Wnioski o warstwach i sposobie nakładania</small></span>
        </button>
      </div>
      <div class="sharing-photo-picker">
        <strong>Zdjęcia widoczne w katalogu</strong>
        <div>
          ${sharingPhotoOption("before", item.image, "Przed wypałem", sharing.imageIds)}
          ${finalImages
            .map((entry, index) =>
              sharingPhotoOption(entry.id, entry.image, `Efekt finalny ${index + 1}`, sharing.imageIds),
            )
            .join("")}
        </div>
      </div>
      ${
        sharing.combination && !sharing.imageIds.length
          ? '<p class="sharing-hint">Wybierz przynajmniej jedno zdjęcie, aby kombinacja pojawiła się w katalogu.</p>'
          : ""
      }
    </section>
  `;
}

function sharingPhotoOption(id, image, label, selectedIds) {
  const selected = selectedIds.includes(id);
  return `
    <button class="sharing-photo ${selected ? "active" : ""}" data-toggle-share-image="${id}" type="button" aria-pressed="${selected}">
      <img src="${image}" alt="" />
      <span>${selected ? "✓ " : ""}${label}</span>
    </button>
  `;
}

function updateItemSharing(itemId, updater) {
  state.items = state.items.map((item) =>
    item.id === itemId
      ? { ...item, sharing: normalizeSharing(updater(normalizeSharing(item.sharing))) }
      : item,
  );
  saveState();
  openItemPreview(itemId);
}

function openRecipeEditor(itemId) {
  const item = state.items.find((candidate) => candidate.id === itemId);
  if (!item) return;
  recipeDraft = {
    itemId,
    ...structuredClone(normalizeRecipe(item.recipe)),
  };
  renderRecipeEditor();
}

function renderRecipeEditor() {
  const item = state.items.find((candidate) => candidate.id === recipeDraft?.itemId);
  if (!item || !recipeDraft) return;
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head">
      <div>
        <p class="eyebrow">Moja receptura wyrobu</p>
        <h2 id="modal-title">Jak powstał ten wyrób?</h2>
        <p>Wybierz fasolki. Wszystkie pola są opcjonalne.</p>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="modal-body recipe-editor">
      <div class="recipe-item-strip">
        <img src="${item.image}" alt="" />
        <div><strong>${studentItemLabel(item)}</strong><span>${formatFullDate(item.date)}</span></div>
      </div>
      ${recipeCategories.map(recipeCategoryEditor).join("")}
      <label class="recipe-note-field">
        <span>Krótka notatka</span>
        <textarea id="recipe-note" rows="3" placeholder="np. 3 cienkie warstwy, nakładane pędzlem">${escapeHtml(recipeDraft.note)}</textarea>
      </label>
    </div>
    <div class="modal-foot">
      <button class="secondary-button" id="cancel-recipe" type="button">Anuluj</button>
      <button class="primary-button" id="save-recipe" type="button">Zapisz notatkę</button>
    </div>`;

  modal.querySelector(".close-modal").addEventListener("click", () => openItemPreview(item.id));
  modal.querySelector("#cancel-recipe").addEventListener("click", () => openItemPreview(item.id));
  modal.querySelectorAll("[data-recipe-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.recipeCategory;
      const value = button.dataset.recipeOption;
      const config = recipeCategories.find((candidate) => candidate.id === category);
      const selected = recipeDraft[category].includes(value);
      recipeDraft[category] = selected
        ? recipeDraft[category].filter((candidate) => candidate !== value)
        : config.multiple
          ? [...recipeDraft[category], value]
          : [value];
      recipeDraft.note = modal.querySelector("#recipe-note").value;
      renderRecipeEditor();
    });
  });
  modal.querySelectorAll("[data-add-custom]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.addCustom;
      const input = modal.querySelector(`[data-custom-input="${category}"]`);
      const value = input.value.trim();
      if (!value) return;
      const config = recipeCategories.find((candidate) => candidate.id === category);
      if (!state.customMaterialOptions[category].includes(value)) {
        state.customMaterialOptions[category].push(value);
      }
      recipeDraft[category] = config.multiple
        ? [...new Set([...recipeDraft[category], value])]
        : [value];
      recipeDraft.note = modal.querySelector("#recipe-note").value;
      saveState();
      renderRecipeEditor();
    });
  });
  modal.querySelector("#save-recipe").addEventListener("click", () => {
    const note = modal.querySelector("#recipe-note").value.trim();
    state.items = state.items.map((candidate) =>
      candidate.id === item.id
        ? {
            ...candidate,
            recipe: {
              clay: recipeDraft.clay,
              glazes: recipeDraft.glazes,
              paints: recipeDraft.paints,
              temperature: recipeDraft.temperature,
              note,
            },
          }
        : candidate,
    );
    saveState();
    openItemPreview(item.id);
    showToast("Notatka zdobienia została zapisana.");
  });
}

function recipeCategoryEditor(category) {
  const options = [
    ...materialOptions[category.id],
    ...(state.customMaterialOptions?.[category.id] || []),
  ];
  return `
    <fieldset class="recipe-category">
      <legend>${category.label}<small>${category.multiple ? "Możesz wybrać kilka" : "Wybierz jedną"}</small></legend>
      <div class="recipe-chip-list">
        ${[...new Set(options)]
          .map(
            (option) =>
              `<button class="recipe-chip ${recipeDraft[category.id].includes(option) ? "active" : ""}" data-recipe-category="${category.id}" data-recipe-option="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>`,
          )
          .join("")}
      </div>
      <div class="custom-chip-row">
        <input class="input" data-custom-input="${category.id}" type="text" placeholder="Dodaj własną fasolkę" />
        <button class="secondary-button" data-add-custom="${category.id}" type="button">Dodaj</button>
      </div>
    </fieldset>
  `;
}

function openGlazePreview(glazeId) {
  const glaze = initialGlazes.find((candidate) => candidate.id === glazeId);
  if (!glaze) return;
  const examples = state.items.filter((item) => {
    const sharing = normalizeSharing(item.sharing);
    return (
      sharing.combination &&
      sharing.imageIds.length &&
      sharedCatalogImage(item) &&
      normalizeRecipe(item.recipe).glazes.includes(glaze.name)
    );
  });
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head glaze-modal-head">
      <div>
        <p class="eyebrow">${glaze.maker} · ${glaze.code}</p>
        <h2 id="modal-title">${glaze.name}</h2>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="glaze-detail-hero">
      <img src="${glaze.image}" alt="Przykład szkliwa ${glaze.name}" />
      <span class="glaze-detail-swatch" style="--swatch: ${glaze.color}"></span>
    </div>
    <div class="modal-body glaze-detail-body">
      <p class="glaze-detail-description">${glaze.description}</p>
      <div class="glaze-detail-facts">
        <div><small>Wykończenie</small><strong>${glaze.finish}</strong></div>
        <div><small>Temperatura</small><strong>${glaze.temperature}</strong></div>
        <div><small>Sprawdzone gliny</small><strong>${glaze.clays.join(", ")}</strong></div>
      </div>
      <div class="catalog-notice compact">
        <strong>Wskazówka pracowni</strong>
        <span>${glaze.notes}</span>
      </div>
      <section class="glaze-examples">
        <div>
          <small>Z doświadczeń pracowni</small>
          <h3>Wyroby z tym szkliwem</h3>
        </div>
        ${
          examples.length
            ? `<div class="glaze-example-row">${examples
                .map(
                  (item) =>
                    `<img src="${sharedCatalogImage(item)}" alt="Udostępniony przykład szkliwa" title="Udostępniony przykład szkliwa" />`,
                )
                .join("")}</div>`
            : "<p>Pierwsze przykłady pojawią się po zapisaniu szkliwa przy wyrobie.</p>"
        }
      </section>
    </div>
    <div class="modal-foot preview-modal-foot">
      <button class="primary-button close-modal" type="button">Wróć do katalogu</button>
    </div>`;
  modal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
  openModal();
}

function toggleSelection(id) {
  state.selected = state.selected.includes(id)
    ? state.selected.filter((itemId) => itemId !== id)
    : [...state.selected, id];
  saveState();
  render();
}

function openJournalFlow(mode = "instructor") {
  journalDraft = {
    mode,
    title: "",
    image: null,
    file: null,
    firing: "glaze",
    stage: "making",
  };
  renderJournalFlow();
  openModal();
}

function renderJournalFlow() {
  const isStudentEntry = journalDraft.mode === "student";
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head">
      <div>
        <p class="eyebrow">${isStudentEntry ? "Moje kombinacje" : "Mój dziennik ceramiczny"}</p>
        <h2 id="modal-title">${isStudentEntry ? "Dodaj wpis do dziennika" : "Dodaj własny wyrób"}</h2>
        <p>Na początek wystarczy zdjęcie i krótka nazwa. Recepturę uzupełnisz później.</p>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="modal-body journal-flow">
      <label class="field">
        <span>Nazwa próby lub wyrobu</span>
        <input class="input" id="journal-title" type="text" placeholder="np. Czarka z próbą zieleni" value="${escapeHtml(journalDraft.title)}" />
      </label>
      <div>
        <span class="journal-field-label">Zdjęcie wyrobu</span>
        <button class="journal-upload ${journalDraft.image ? "has-photo" : ""}" id="journal-upload" type="button">
          ${
            journalDraft.image
              ? `<img src="${journalDraft.image}" alt="Wybrane zdjęcie własnego wyrobu" /><span>Zmień zdjęcie</span>`
              : `<span class="camera-symbol">${icons.camera}</span><strong>Zrób lub dodaj zdjęcie</strong>`
          }
        </button>
        <div class="demo-final-row journal-demo-row">
          <span>Demo:</span>
          ${["kubek", "miska", "talerz", "wazon"]
            .map(
              (name) =>
                `<button data-journal-demo-image="assets/${name}.webp" type="button" aria-label="Wybierz zdjęcie do dziennika: ${name}"><img src="assets/${name}.webp" alt="" /></button>`,
            )
            .join("")}
        </div>
      </div>
      <fieldset class="journal-choice">
        <legend>Na jakim jest etapie?</legend>
        <div class="recipe-chip-list">
          <button class="recipe-chip ${journalDraft.stage === "making" ? "active" : ""}" data-journal-stage="making" type="button">W trakcie</button>
          <button class="recipe-chip ${journalDraft.stage === "finished" ? "active" : ""}" data-journal-stage="finished" type="button">Gotowy po wypale</button>
        </div>
      </fieldset>
      <fieldset class="journal-choice">
        <legend>Rodzaj wypału</legend>
        <div class="recipe-chip-list">
          <button class="recipe-chip ${journalDraft.firing === "bisque" ? "active" : ""}" data-journal-firing="bisque" type="button">Biskwit</button>
          <button class="recipe-chip ${journalDraft.firing === "glaze" ? "active" : ""}" data-journal-firing="glaze" type="button">Na ostro</button>
        </div>
      </fieldset>
    </div>
    <div class="modal-foot">
      <button class="secondary-button close-modal" type="button">Anuluj</button>
      <button class="primary-button" id="save-journal-item" type="button" ${journalDraft.image ? "" : "disabled"}>${isStudentEntry ? "Dodaj do Moich kombinacji" : "Dodaj do dziennika"}</button>
    </div>`;

  modal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("#journal-title").addEventListener("input", (event) => {
    journalDraft.title = event.target.value;
  });
  modal.querySelector("#journal-upload").addEventListener("click", () => {
    journalDraft.title = modal.querySelector("#journal-title").value;
    openPhotoSourcePicker("journal-photo-input", "journal-photo-camera-input");
  });
  modal.querySelectorAll("[data-journal-demo-image]").forEach((button) => {
    button.addEventListener("click", () => {
      journalDraft.title = modal.querySelector("#journal-title").value;
      journalDraft.image = button.dataset.journalDemoImage;
      journalDraft.file = null;
      renderJournalFlow();
    });
  });
  modal.querySelectorAll("[data-journal-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      journalDraft.title = modal.querySelector("#journal-title").value;
      journalDraft.stage = button.dataset.journalStage;
      renderJournalFlow();
    });
  });
  modal.querySelectorAll("[data-journal-firing]").forEach((button) => {
    button.addEventListener("click", () => {
      journalDraft.title = modal.querySelector("#journal-title").value;
      journalDraft.firing = button.dataset.journalFiring;
      renderJournalFlow();
    });
  });
  modal.querySelector("#save-journal-item")?.addEventListener("click", saveJournalItem);
}

async function saveJournalItem() {
  const title = document.querySelector("#journal-title").value.trim();
  if (!journalDraft.image) return;
  const button = document.querySelector("#save-journal-item");
  try {
    button.disabled = true;
    button.textContent = liveMode ? "Wysyłanie zdjęcia..." : button.textContent;
    if (journalDraft.file && liveMode) {
      journalDraft.image = await liveBackend.uploadImage(journalDraft.file, "journal");
    }
  } catch (error) {
    button.disabled = false;
    button.textContent = "Dodaj do dziennika";
    showToast(error.message || "Nie udało się wysłać zdjęcia.");
    return;
  }
  const isStudentEntry = journalDraft.mode === "student";
  const id = liveMode
    ? Date.now()
    : Math.max(100, ...state.items.map((item) => item.id)) + 1;
  state.items.push({
    id,
    code: `MC-${String(id).padStart(4, "0")}`,
    name: title || `Próba z ${formatFullDate("2026-06-11")}`,
    owner: isStudentEntry ? "Anna Kowalska" : currentInstructorName(),
    ownerId: isStudentEntry ? "anna" : currentInstructorId(),
    image: journalDraft.image,
    status: journalDraft.stage === "finished" ? "collected" : "waiting",
    firing: journalDraft.firing,
    group: isStudentEntry ? "Moje kombinacje" : "Dziennik instruktora",
    date: new Date().toISOString().slice(0, 10),
    firedAt:
      journalDraft.stage === "finished" ? new Date().toISOString().slice(0, 10) : undefined,
    personalJournal: true,
    journalStage: journalDraft.stage,
    finalImages: [],
    sharing: normalizeSharing(),
    recipe: normalizeRecipe(),
  });
  publishStudioEvent({
    type: "journal-added",
    title: "Nowy wyrób instruktora",
    body: `${currentInstructorName()} dodał(a) wyrób do swojej ceramiki.`,
    itemIds: [id],
  });
  saveState();
  closeModal();
  state.view = isStudentEntry ? "combinations" : "journal";
  render();
  showToast(
    isStudentEntry
      ? "Prywatny wpis został dodany do Moich kombinacji."
      : "Wyrób został dodany do Twojego dziennika.",
  );
}

function openAddFlow() {
  addFlow = {
    step: 1,
    photos: [],
  };
  renderAddFlow();
  openModal();
}

function renderAddFlow() {
  const modal = document.querySelector("#modal");
  const titles = [
    "Dodaj zdjęcia wyrobów",
    "Zaznacz wyroby na ostro",
  ];
  modal.innerHTML = `
    <div class="modal-head">
      <div>
        <h2 id="modal-title">${titles[addFlow.step - 1]}</h2>
        <p>${addFlowStepDescription()}</p>
        <div class="steps" aria-label="Krok ${addFlow.step} z 2">
          ${[1, 2].map((step) => `<span class="step-dot ${step <= addFlow.step ? "active" : ""}"></span>`).join("")}
        </div>
      </div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="modal-body">${addFlowBody()}</div>
    <div class="modal-foot">
      ${addFlow.step > 1 ? '<button class="secondary-button" id="add-back" type="button">Wstecz</button>' : "<span></span>"}
      ${
        addFlow.step === 1
          ? `<button class="primary-button" id="add-next" type="button" ${addFlow.photos.length ? "" : "disabled"}>Dodałem już wszystkie zdjęcia</button>`
          : ""
      }
      ${addFlow.step === 2 ? '<button class="primary-button" id="confirm-add" type="button">Dodaj wyroby do pracowni</button>' : ""}
    </div>
  `;

  modal.querySelector(".close-modal").addEventListener("click", closeModal);
  modal.querySelector("#add-back")?.addEventListener("click", () => {
    addFlow.step -= 1;
    renderAddFlow();
  });
  modal.querySelector("#add-next")?.addEventListener("click", () => {
    addFlow.step += 1;
    renderAddFlow();
  });
  modal.querySelector("#confirm-add")?.addEventListener("click", confirmNewItems);
  modal.querySelector("#all-glaze")?.addEventListener("click", () => {
    const shouldSelectAll = !addFlow.photos.every((photo) => photo.firing === "glaze");
    addFlow.photos.forEach((photo) => {
      photo.firing = shouldSelectAll ? "glaze" : "bisque";
    });
    renderAddFlow();
  });

  modal.querySelectorAll("[data-toggle-firing]").forEach((button) => {
    const toggleFiring = () => {
      const photo = addFlow.photos.find((item) => item.id === button.dataset.toggleFiring);
      photo.firing = photo.firing === "bisque" ? "glaze" : "bisque";
      renderAddFlow();
    };
    button.addEventListener("click", toggleFiring);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFiring();
      }
    });
  });

  modal.querySelector("#upload-zone")?.addEventListener("click", () => {
    openPhotoSourcePicker("photo-input", "photo-camera-input");
  });

  modal.querySelectorAll("[data-demo-image]").forEach((button) => {
    button.addEventListener("click", () => {
      addPhoto(button.dataset.demoImage);
      renderAddFlow();
    });
  });

  modal.querySelectorAll("[data-remove-photo]").forEach((button) => {
    button.addEventListener("click", () => {
      addFlow.photos = addFlow.photos.filter((photo) => photo.id !== button.dataset.removePhoto);
      renderAddFlow();
    });
  });

}

function addFlowStepDescription() {
  if (addFlow.step === 1) return "Dodaj po jednym wyraźnym zdjęciu każdej sztuki.";
  return "Domyślnie wszystkie sztuki są oznaczone jako biskwit.";
}

function addFlowBody() {
  if (addFlow.step === 1) {
    return `
      <button class="upload-zone" id="upload-zone" type="button">
        <span>
          <span class="camera-symbol">${icons.camera}</span>
          <strong>Zrób lub dodaj zdjęcie</strong>
          <small>Jeżeli Ty nie poznajesz swojego wyrobu na zdjęciu, my też go później nie poznamy.</small>
        </span>
      </button>
      <p class="demo-label">W wersji demonstracyjnej dodaj przykładowy wyrób:</p>
      <div class="demo-photo-row">
        ${[
          ["wazon", "Wazon"],
          ["kubek", "Kubek"],
          ["miska", "Miska"],
          ["talerz", "Talerz"],
        ]
          .map(
            ([file, name]) =>
              `<button class="demo-photo" data-demo-image="assets/${file}.webp" data-demo-name="${name}" type="button" aria-label="Dodaj zdjęcie: ${file}"><img src="assets/${file}.webp" alt="" /></button>`,
          )
          .join("")}
      </div>
      ${
        addFlow.photos.length
          ? `
            <div class="recognition-note">
              <strong>Jeżeli Ty nie poznajesz swojego wyrobu na zdjęciu, my też go później nie poznamy.</strong>
              <p>Sprawdź podgląd. Usuń nieczytelne zdjęcie krzyżykiem i od razu dodaj nowe.</p>
            </div>
            <div class="photo-section-head"><strong>Dodane zdjęcia</strong><span>${addFlow.photos.length} ${pluralPhotos(addFlow.photos.length)}</span></div>
            ${photoGrid("editing")}
          `
          : ""
      }
    `;
  }

  const glazeCount = addFlow.photos.filter((photo) => photo.firing === "glaze").length;
  const allGlaze = glazeCount === addFlow.photos.length;
  return `
    <div class="firing-instruction">
      <strong>Kliknij tylko te wyroby, które mają być wypalone na ostro.</strong>
      <p>Beżowy oznacza biskwit. Po kliknięciu kafelek zmieni kolor i podpis na „Na ostro”.</p>
    </div>
    ${photoGrid("firing")}
    <button class="all-glaze-card ${allGlaze ? "active" : ""}" id="all-glaze" type="button">
      <span class="all-glaze-check" aria-hidden="true">${allGlaze ? "✓" : ""}</span>
      <span>
        <strong>Wszystko jest na ostro</strong>
        <small>${allGlaze ? "Kliknij ponownie, aby przywrócić wszystko do biskwitu." : "Jednym kliknięciem oznacz wszystkie dodane zdjęcia."}</small>
      </span>
    </button>
    <div class="firing-summary">
      <span><i class="summary-dot bisque"></i>Biskwit: <strong>${addFlow.photos.length - glazeCount}</strong></span>
      <span><i class="summary-dot glaze"></i>Na ostro: <strong>${glazeCount}</strong></span>
    </div>
  `;
}

function addPhoto(image, file = null) {
  addFlow.photos.push({
    id: `photo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    image,
    file,
    firing: "bisque",
  });
}

async function prepareImage(file) {
  if (!liveMode) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ image: reader.result, file: null });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const bitmap = await createImageBitmap(file);
  const maxSide = 1800;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("Nie udało się przygotować zdjęcia."))),
      "image/jpeg",
      0.84,
    );
  });
  const preparedFile = new File(
    [blob],
    `${file.name.replace(/\.[^.]+$/, "") || "zdjecie"}.jpg`,
    { type: "image/jpeg", lastModified: Date.now() },
  );
  return {
    image: URL.createObjectURL(preparedFile),
    file: preparedFile,
  };
}

function pluralPhotos(count) {
  if (count === 1) return "zdjęcie";
  if (count >= 2 && count <= 4) return "zdjęcia";
  return "zdjęć";
}

function photoGrid(mode) {
  return `
    <div class="flow-photo-grid ${mode === "firing" ? "firing-grid" : ""}">
      ${addFlow.photos
        .map(
          (photo, index) => `
            <article
              class="flow-photo-card ${mode === "firing" ? `firing-choice ${photo.firing}` : ""}"
              ${mode === "firing" ? `data-toggle-firing="${photo.id}" role="button" tabindex="0" aria-label="Zmień rodzaj wypału dla zdjęcia ${index + 1}"` : ""}
            >
              <div class="flow-photo-image">
                <img src="${photo.image}" alt="Zdjęcie ${index + 1}" />
                ${mode === "editing" ? `<button class="remove-photo" data-remove-photo="${photo.id}" type="button" aria-label="Usuń zdjęcie ${index + 1}">×</button>` : ""}
              </div>
              <div class="flow-photo-caption">
                <strong class="photo-sequence">${index + 1}</strong>
                ${mode === "firing" ? `<span>${photo.firing === "bisque" ? "Biskwit" : "Na ostro"}</span>` : ""}
              </div>
            </article>`,
        )
        .join("")}
    </div>`;
}

async function confirmNewItems() {
  const confirmButton = document.querySelector("#confirm-add");
  if (confirmButton) {
    confirmButton.disabled = true;
    confirmButton.textContent = liveMode ? "Wysyłanie zdjęć..." : "Dodawanie...";
  }
  const storedPhotos = [];
  try {
    for (const photo of addFlow.photos) {
      storedPhotos.push({
        ...photo,
        image:
          photo.file && liveMode
            ? await liveBackend.uploadImage(photo.file, "items")
            : photo.image,
      });
    }
  } catch (error) {
    if (confirmButton) {
      confirmButton.disabled = false;
      confirmButton.textContent = "Dodaj wyroby do pracowni";
    }
    showToast(error.message || "Nie udało się wysłać zdjęć.");
    return;
  }
  const session = currentSession();
  const ownerId =
    state.role === "student"
      ? "anna"
      : state.role === "instructor"
        ? currentInstructorId()
        : session.ownerId;
  const owner =
    state.role === "student"
      ? "Anna Kowalska"
      : state.role === "instructor"
        ? currentInstructorName()
        : session.email;
  let nextId = liveMode
    ? Date.now()
    : state.role === "student"
      ? Math.max(0, ...state.items.filter((item) => item.id < 100).map((item) => item.id)) + 1
      : Math.max(100, ...state.items.map((item) => item.id)) + 1;
  const today = new Date().toISOString().slice(0, 10);
  const newItems = storedPhotos.map((photo, index) => {
    const id = liveMode ? nextId + index : nextId++;
    return {
      id,
      code: `MC-${String(id).padStart(4, "0")}`,
      owner,
      ownerId,
      ownerEmail: state.role === "guest" ? session.email : undefined,
      image: photo.image,
      status: "waiting",
      firing: photo.firing,
      group:
        state.role === "student"
          ? "Dostawa 09.06"
          : state.role === "instructor"
            ? "Dostawa instruktora 11.06"
            : "Wypał gościnny 11.06",
      date: liveMode ? today : state.role === "student" ? "2026-06-09" : "2026-06-11",
      finalImages: [],
      sharing: normalizeSharing(),
      recipe: normalizeRecipe(),
    };
  });
  state.items.push(...newItems);
  if (state.role === "guest") {
    state.emailEvents.unshift({
      id: `email-added-${Date.now()}`,
      type: "added",
      email: session.email,
      itemIds: newItems.map((item) => item.id),
      createdAt: Date.now(),
    });
  }
  publishStudioEvent({
    type: "items-added",
    title: "Nowa ceramika w pracowni",
    body: `${owner} dodał(a) ${newItems.length} ${pluralItems(newItems.length)} do wypału.`,
    itemIds: newItems.map((item) => item.id),
  });
  saveState();
  closeModal();
  if (state.role === "student") {
    state.studentItemsTab = "studio";
    state.studentFilter = "all";
    state.view = "my-items";
  } else if (state.role === "instructor") {
    state.instructorPersonalFilter = "all";
    state.view = "journal";
  } else {
    state.view = "guest-items";
  }
  render();
  showToast(
    state.role === "guest"
      ? `${newItems.length} ${pluralItems(newItems.length)} dodano. Potwierdzenie e-mail jest gotowe.`
      : `${newItems.length} ${pluralItems(newItems.length)} dodano do jednej dostawy.`,
  );
}

function openFiredConfirmation() {
  const count = state.selected.length;
  const modal = document.querySelector("#modal");
  modal.innerHTML = `
    <div class="modal-head">
      <div><h2 id="modal-title">Potwierdź wypał</h2><p>Ta operacja przygotuje powiadomienia właścicielom.</p></div>
      <button class="icon-button close-modal" type="button" aria-label="Zamknij">×</button>
    </div>
    <div class="modal-body">
      <div class="confirmation-visual">✓</div>
      <div class="confirmation-copy">
        <h3>${count} ${pluralItems(count)} ${count === 1 ? "został wypalony" : "zostały wypalone"}?</h3>
        <p>Wybrane zdjęcia trafią do sekcji „Gotowe do odbioru”. Każdy właściciel otrzyma informację o swoich wyrobach.</p>
      </div>
    </div>
    <div class="modal-foot">
      <button class="secondary-button close-modal" type="button">Jeszcze nie</button>
      <button class="primary-button" id="confirm-fired" type="button">Tak, potwierdzam wypał</button>
    </div>`;
  modal.querySelectorAll(".close-modal").forEach((button) => button.addEventListener("click", closeModal));
  modal.querySelector("#confirm-fired").addEventListener("click", confirmFired);
  openModal();
}

function confirmFired() {
  const count = state.selected.length;
  const firedItems = state.items.filter((item) => state.selected.includes(item.id));
  const today = new Date().toISOString().slice(0, 10);
  state.items = state.items.map((item) =>
    state.selected.includes(item.id)
      ? { ...item, status: "ready", firedAt: liveMode ? today : "2026-06-09" }
      : item,
  );
  const guestEmails = [...new Set(firedItems.map((item) => item.ownerEmail).filter(Boolean))];
  guestEmails.forEach((email) => {
    state.emailEvents.unshift({
      id: `email-fired-${Date.now()}-${email}`,
      type: "fired",
      email,
      itemIds: firedItems.filter((item) => item.ownerEmail === email).map((item) => item.id),
      createdAt: Date.now(),
    });
  });
  publishStudioEvent({
    type: "items-fired",
    title: "Ceramika po wypale",
    body: `${currentInstructorName()} oznaczył(a) ${count} ${pluralItems(count)} jako gotowe.`,
    itemIds: firedItems.map((item) => item.id),
  });
  state.selected = [];
  saveState();
  closeModal();
  render();
  showToast(
    guestEmails.length
      ? `${count} ${pluralItems(count)} oznaczono jako wypalone. E-mail do gościa jest gotowy.`
      : `${count} ${pluralItems(count)} oznaczono jako wypalone. Powiadomienia są gotowe.`,
  );
}

function updatePrice() {
  const bisque = Number(document.querySelector("#bisque-weight")?.value || 0);
  const glaze = Number(document.querySelector("#glaze-weight")?.value || 0);
  document.querySelector("#bisque-price").textContent = formatMoney(bisque * 28);
  document.querySelector("#glaze-price").textContent = formatMoney(glaze * 45);
  document.querySelector("#total-price").textContent = formatMoney(bisque * 28 + glaze * 45);
}

function saveSettlement() {
  const owner = document.querySelector("#settlement-client").value;
  const bisque = Number(document.querySelector("#bisque-weight").value || 0);
  const glaze = Number(document.querySelector("#glaze-weight").value || 0);
  const total = bisque * 28 + glaze * 45;
  if (!total) {
    showToast("Najpierw wpisz wagę ceramiki.");
    return;
  }
  state.payments.unshift({
    id: Date.now(),
    owner,
    date: "2026-06-09",
    bisque,
    glaze,
    total,
  });
  publishStudioEvent({
    type: "settlement-added",
    title: "Nowe rozliczenie",
    body: `${currentInstructorName()} zapisał(a) rozliczenie ${formatMoney(total)} dla ${owner}.`,
  });
  saveState();
  render();
  showToast(`Rozliczenie ${formatMoney(total)} zostało zapisane.`);
}

function formatMoney(value) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value);
}

function openModal() {
  document.querySelector("#modal-backdrop").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  closePhotoSourcePicker();
  document.querySelector("#modal-backdrop").classList.add("hidden");
  document.body.style.overflow = "";
}

function openPhotoSourcePicker(galleryInputId, cameraInputId) {
  closePhotoSourcePicker();
  const picker = document.createElement("div");
  picker.className = "photo-source-backdrop";
  picker.id = "photo-source-picker";
  picker.innerHTML = `
    <div class="photo-source-sheet" role="dialog" aria-modal="true" aria-label="Dodaj zdjęcie">
      <button data-photo-input="${cameraInputId}" type="button">
        <span class="photo-source-icon">${icons.camera}</span>
        <strong>Zrób zdjęcie</strong>
      </button>
      <button data-photo-input="${galleryInputId}" type="button">
        <span class="photo-source-icon">${icons.gallery}</span>
        <strong>Wybierz z galerii</strong>
      </button>
      <button class="photo-source-cancel" type="button">Anuluj</button>
    </div>`;
  picker.addEventListener("click", (event) => {
    const sourceButton = event.target.closest("[data-photo-input]");
    if (sourceButton) {
      const input = document.querySelector(`#${sourceButton.dataset.photoInput}`);
      closePhotoSourcePicker();
      input.click();
      return;
    }
    if (event.target === picker || event.target.closest(".photo-source-cancel")) {
      closePhotoSourcePicker();
    }
  });
  document.body.append(picker);
}

function closePhotoSourcePicker() {
  document.querySelector("#photo-source-picker")?.remove();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.remove("hidden");
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3400);
}

document.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => {
    state.role = button.dataset.role;
    state.view =
      state.role === "student" ? "home" : state.role === "instructor" ? "gallery" : "guest-items";
    state.selected = [];
    combinationShareMode = false;
    combinationShareSelection = [];
    const session = currentSession();
    if (session) {
      const previewProfile =
        state.role === "student"
          ? {
              email: "anna@malinaceramik.pl",
              name: "Anna Kowalska",
              ownerId: undefined,
            }
          : state.role === "instructor"
            ? {
                email: "marta@malinaceramik.pl",
                name: "Marta Wiśniewska",
                ownerId: undefined,
              }
            : {
                email: "gosc.demo@malinaceramik.pl",
                name: "Gość",
                ownerId: guestOwnerId("gosc.demo@malinaceramik.pl"),
              };
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          ...session,
          role: state.role,
          ...previewProfile,
          guestAccess: false,
        }),
      );
    }
    document.querySelector("#mobile-nav").classList.toggle("hidden", state.role === "guest");
    document.body.classList.toggle("guest-mode", state.role === "guest");
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (guestLoginActive) {
    loginAsGuest(document.querySelector("#login-email").value);
  } else {
    login(
      document.querySelector("#login-email").value,
      document.querySelector("#login-password").value,
    );
  }
});

document.querySelector("#guest-login-toggle").addEventListener("click", () => {
  setGuestLogin(!guestLoginActive);
});

document.querySelector("#login-email").addEventListener("input", () => {
  document.querySelector("#login-error").classList.add("hidden");
});

document.querySelector("#toggle-password").addEventListener("click", (event) => {
  const input = document.querySelector("#login-password");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  event.currentTarget.textContent = visible ? "Pokaż" : "Ukryj";
  event.currentTarget.setAttribute("aria-label", visible ? "Pokaż hasło" : "Ukryj hasło");
});

document.querySelectorAll("[data-demo-login]").forEach((button) => {
  button.addEventListener("click", () => {
    setGuestLogin(false);
    const student = button.dataset.demoLogin === "student";
    document.querySelector("#login-email").value = student
      ? "anna@malinaceramik.pl"
      : "marta@malinaceramik.pl";
    document.querySelector("#login-password").value = "malina123";
    document.querySelector("#login-error").classList.add("hidden");
  });
});

document.querySelector("#profile-button").addEventListener("click", () => {
  document.querySelector("#profile-menu").classList.toggle("hidden");
});

document.querySelector("#logout-button").addEventListener("click", logout);

document.addEventListener("click", (event) => {
  if (!event.target.closest("#profile-button") && !event.target.closest("#profile-menu")) {
    document.querySelector("#profile-menu").classList.add("hidden");
  }
});

document.querySelector("#reset-demo").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(initialState);
  combinationShareMode = false;
  combinationShareSelection = [];
  render();
  showToast("Dane demonstracyjne zostały przywrócone.");
});

document.querySelector("#modal-backdrop").addEventListener("click", (event) => {
  if (event.target.id === "modal-backdrop") closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (document.querySelector("#photo-source-picker")) {
      closePhotoSourcePicker();
      return;
    }
    closeModal();
    document.querySelector("#profile-menu").classList.add("hidden");
  }
});

async function handlePhotoInput(event) {
  const files = [...event.target.files];
  if (!files.length) return;
  try {
    const prepared = await Promise.all(files.map(prepareImage));
    prepared.forEach(({ image, file }) => addPhoto(image, file));
    renderAddFlow();
  } catch {
    showToast("Nie udało się odczytać jednego ze zdjęć.");
  }
  event.target.value = "";
}

async function handleFinalPhotoInput(event) {
  const files = [...event.target.files];
  const itemId = finalPhotoTargetId;
  if (!files.length || !itemId) return;
  try {
    const images = await Promise.all(files.map(prepareImage));
    await addFinalImages(itemId, images);
    finalPhotoTargetId = null;
  } catch (error) {
    showToast(error.message || "Nie udało się wysłać zdjęć.");
  }
  event.target.value = "";
}

async function handleJournalPhotoInput(event) {
  const [file] = [...event.target.files];
  if (!file || !journalDraft) return;
  try {
    const prepared = await prepareImage(file);
    journalDraft.image = prepared.image;
    journalDraft.file = prepared.file;
    renderJournalFlow();
  } catch {
    showToast("Nie udało się przygotować zdjęcia.");
  }
  event.target.value = "";
}

["photo-input", "photo-camera-input"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("change", handlePhotoInput);
});

["final-photo-input", "final-photo-camera-input"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("change", handleFinalPhotoInput);
});

["journal-photo-input", "journal-photo-camera-input"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("change", handleJournalPhotoInput);
});

async function bootstrapApplication() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        serviceWorkerRegistration = registration;
      })
      .catch(() => {
        serviceWorkerRegistration = null;
      });
  }

  try {
    if (await initializeLivePilot()) return;
  } catch (error) {
    console.error("Nie udało się uruchomić trybu pilotażowego.", error);
    document.querySelector("#login-error").textContent =
      "Nie udało się połączyć z usługą logowania. Spróbuj ponownie za chwilę.";
    document.querySelector("#login-error").classList.remove("hidden");
  }

  const savedSession = currentSession();
  if (
    savedSession &&
    (demoAccounts[savedSession.email] ||
      (savedSession.role === "guest" && savedSession.email && savedSession.ownerId))
  ) {
    showApplication(savedSession);
  } else {
    showLogin();
  }
}

bootstrapApplication();
