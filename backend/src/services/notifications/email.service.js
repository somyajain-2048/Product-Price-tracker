import nodemailer from "nodemailer";
import { buildPriceDropEmail } from "./email.template.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPriceDropEmail = async ({
  to,
  userName,
  productTitle,
  oldPrice,
  newPrice,
  productUrl,
  productImage,
}) => {
  const savings = oldPrice - newPrice;
  const savingsPct = Math.round((savings / oldPrice) * 100);
  const shortTitle = productTitle.length > 60 ? productTitle.substring(0, 60) + "…" : productTitle;
  const html = buildPriceDropEmail({ userName, productTitle, oldPrice, newPrice, productUrl, productImage });

  try {
    await transporter.sendMail({
      from: `"PriceTrack" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Price dropped ${savingsPct}% — "${shortTitle}"`,
      html,
    });
    console.log(`[Email] Alert sent to ${to}`);
  } catch (err) {
    console.error("[Email] Failed to send:", err.message);
  }
};
