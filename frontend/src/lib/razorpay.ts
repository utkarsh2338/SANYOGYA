import Razorpay from "razorpay";
import crypto from "crypto";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * Create a Razorpay order for a membership payment.
 * @param amountInPaise - Amount in the smallest currency unit (paise)
 */
export async function createOrder(amountInPaise: number, receipt: string) {
  return razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt,
  });
}

/**
 * Verify a Razorpay payment signature.
 * Call this after the client-side payment success callback.
 */
export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}
