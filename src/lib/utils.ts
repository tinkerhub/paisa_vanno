import crypto from "crypto";

export function generateSignature(data: string) {
  const hmac = crypto.createHmac(
    "sha256",
    process.env.RAZORPAY_WEBHOOK_SECRET!
  );
  hmac.update(JSON.stringify(data));
  return hmac.digest("hex");
}
// create the signature heading i think we wont be needing this.
export function generateSecureHeader(data: any) {
  const signature = generateSignature(data);
  return {
    Authorization: `Bearer ${signature}`,
    "Content-Type": "application/json",
  };
}
