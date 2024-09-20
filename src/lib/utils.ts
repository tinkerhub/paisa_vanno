
export function absoluteUrl(path: string): string {
    if (typeof window !== "undefined") return path;
    if (process.env.NODE_ENV === "production") {
      return `${process.env.NEXT_PUBLIC_DOMAIN as string}${path}`;
    } else {
      return `http://localhost:${process.env.PORT ?? 3002}${path}`;
    }
  }

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

