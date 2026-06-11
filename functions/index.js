const { setGlobalOptions } = require("firebase-functions/v2");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { Firestore, FieldValue } = require("@google-cloud/firestore");
const { GoogleAuth } = require("google-auth-library");

setGlobalOptions({ region: "europe-central2", maxInstances: 3 });

exports.sendStudioNotification = onDocumentCreated(
  "studios/{studioId}/notifications/{notificationId}",
  async (event) => {
    const notification = event.data?.data();
    if (!notification) return;

    const database = new Firestore();
    const tokenSnapshot = await database
      .collection("pushTokens")
      .where("studioId", "==", event.params.studioId)
      .get();
    const recipients = tokenSnapshot.docs.filter(
      (document) => document.data().uid !== notification.actorUid,
    );
    if (!recipients.length) return;

    const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT;
    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });
    const client = await auth.getClient();
    const responses = await Promise.allSettled(
      recipients.map((document) =>
        client.request({
          url: `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
          method: "POST",
          data: {
            message: {
              token: document.data().token,
              notification: {
                title: notification.title || "Malina ceramik",
                body:
                  notification.body ||
                  "W pracowni pojawiła się nowa informacja.",
              },
              webpush: {
                fcmOptions: {
                  link: notification.url || "/",
                },
              },
            },
          },
        }),
      ),
    );
    const successCount = responses.filter(
      (response) => response.status === "fulfilled",
    ).length;

    await event.data.ref.set(
      {
        sentAt: FieldValue.serverTimestamp(),
        recipientCount: successCount,
        failedCount: responses.length - successCount,
      },
      { merge: true },
    );
  },
);
