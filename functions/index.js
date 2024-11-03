/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const { Stripe } = require("stripe");
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

// Создание Stripe Checkout сессии
exports.createStripeCheckoutSession = functions.https.onCall(
  async (snap, context) => {
    const { amount, table } = snap.data();

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd", // Замените на свою валюту
              product_data: {
                name: table, // Название вашего товара или услуги
              },
              unit_amount: amount, // Цена в центах (в этом случае $50.00)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:5000/", // URL для успешной оплаты
        cancel_url: "http://localhost:5000/", // URL для отмены оплаты
      });

      return { id: session.id }; // Верните ID сессии для клиента
    } catch (error) {
      console.error("Ошибка при создании сессии Stripe:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Не удалось создать сессию оплаты"
      );
    }
  }
);

exports.deleteOldUnapprovedReservations = functions.https.onRequest(
  async (req, res) => {
    const db = admin.firestore();
    const fiveMinutesAgo = Date.now() - 1 * 60 * 1000;

    try {
      // Получаем все резервирования с approved: false и createdAt менее 5 минут назад
      const snapshot = await db
        .collection("reservations")
        .where("approved", "==", false)
        .where("startTime", "<=", new Date(fiveMinutesAgo)) // Убедитесь, что createdAt хранится правильно
        .get();

      if (snapshot.empty) {
        console.log("No old unapproved reservations found.");
        return res.status(204).send(); // Выход, если нет старых резервирований
      }

      const batch = db.batch();
      snapshot.forEach((doc) => {
        batch.delete(doc.ref); // Удаляем все просроченные резервирования
      });

      await batch.commit();
      console.log("Deleted old unapproved reservations.");
      return res.status(200).send("Old unapproved reservations deleted.");
    } catch (error) {
      console.error("Error deleting old unapproved reservations:", error);
      return res
        .status(500)
        .send("Error deleting old unapproved reservations.");
    }
  }
);
