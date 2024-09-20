import { TRPCError } from "@trpc/server";

type IhandlePaymentCapturedEvent = {
  body: any;
};
export async function handlePaymentCapturedEvent({
  body,
}: IhandlePaymentCapturedEvent) {
  try {
    const payment = body.payload.payment.entity;
    const Amount = payment.amount;
  } catch (error) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Request couldn't be handled",
    });
  }
}
