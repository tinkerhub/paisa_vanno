import { db } from "@/db";
import { TRPCBuilder, TRPCError } from "@trpc/server";

type ICreateOrThrowPaymentRecieved = {
  paymentId: string;
  amount: number;
};
export async function CreatePaymentRecieved({
  amount,
  paymentId,
}: ICreateOrThrowPaymentRecieved) {
  try {
    let recievedAmount = amount / 100;
    const data = await db.payments.create({
      data: {
        paymentId: paymentId,
        recievedAmount,
      },
    });
    if (!data.id) {
      throw new Error("Failed to create Payment");
    }
  } catch (error) {
    console.error("FATAL:Failed to Create a Payment in Database", "+=Events");
    return null;
  }
}
