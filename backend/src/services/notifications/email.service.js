import nodemailer from "nodemailer";

// =====================================
// EMAIL TRANSPORTER
// =====================================


const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

});


// =====================================
// SEND PRICE DROP EMAIL
// =====================================

export const sendPriceDropEmail = async ({
  to,
  productTitle,
  oldPrice,
  newPrice,
  productUrl,
}) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,

      to,

      subject: "🔥 Price Dropped!",

      html: `
        <h2>Price Drop Alert 🚀</h2>

        <p>
          <strong>${productTitle}</strong>
        </p>

        <p>
          Old Price: ₹${oldPrice}
        </p>

        <p>
          New Price: ₹${newPrice}
        </p>

        <a href="${productUrl}">
          View Product
        </a>
      `,
    };

    console.log("Sending email...");
    await transporter.sendMail(mailOptions);

    console.log("Price drop email sent");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};
