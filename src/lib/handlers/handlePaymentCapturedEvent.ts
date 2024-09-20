import {
  createEventorThrow,
  updateEventToSucess,
  UpdateFailedCount,
} from "@/data/dto/events";
import { TRPCError } from "@trpc/server";
import { Events } from "@prisma/client";
import { CreateOrThrowPaymentRecieved } from "@/data/dto/Payment";
import { NextResponse } from "next/server";
type IhandlePaymentCapturedEvent = {
  event: Events;
  body: any;
};
export async function handlePaymentCapturedEvent({
  body,
  event,
}: IhandlePaymentCapturedEvent) {
  try {
    const payment = body.payload.payment.entity;
    const { amount, id: paymentId } = payment.amount;

    let createEventRetryLoop = DATABASE_CREATE_RETRY_LOOP_STARTS_FROM;
    let createEventFlag = false;

    while (
      createEventRetryLoop <= MAX_DATABASE_CREATE_RETRY_LOOP &&
      !createEventFlag
    ) {
      try {
        // Insert the event into data-base
        let isCreated = await CreateOrThrowPaymentRecieved({
          amount,
          paymentId,
        });
        if (!isCreated) {
          throw new Error("Failed to created ");
        }
        createEventFlag = true;
        continue;
      } catch (error) {
        createEventRetryLoop++;
      }
    }
    await updateEventToSucess({ id: event.id });
    return NextResponse.json({ status: 2999 });
  } catch (error) {
    await UpdateFailedCount(event.id, "Failed to create Payment order");
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Request couldn't be handled",
    });
  }
}
