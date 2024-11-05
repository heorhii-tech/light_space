/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
admin.initializeApp();

const { Stripe } = require("stripe");
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

// Создание Stripe Checkout сессии
exports.createStripeCheckoutSession = functions.https.onCall(
  async (data, context) => {
    const { amount, productName, reservations } = data;
    console.log(reservations);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: productName }, // Убедитесь, что product_data и name передаются правильно
              unit_amount: amount * 100, // Stripe требует указания суммы в центах
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://light-space.onrender.com/#/reservation", // URL для успешной оплаты
        cancel_url: "https://light-space.onrender.com/#/reservation", // URL для отмены оплаты
        metadata: { reservations: reservations },
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
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const endpointSecret = functions.config().stripe.webhook_secret;

  // Убедитесь, что используется `rawBody`
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Error verifying Stripe signature:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Обработка события Stripe
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("Payment was successful. Session ID:", session.id);

    try {
      const reservations = JSON.parse(session.metadata.reservations);

      reservations.forEach(async (reservationID) => {
        const reservationRef = admin
          .firestore()
          .collection("reservations")
          .doc(reservationID);
        await reservationRef.update({
          approved: true,
          paymentMethod: "Online",
          paid: true,
        });
        console.log(`Reservation ${reservationID} updated successfully.`);
      });
    } catch (error) {
      console.error(`Error updating reservation: ${error.message}`);
    }
  }

  res.json({ received: true });
});
