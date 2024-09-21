import { updateEventToSucess, UpdateFailedCount } from "@/data/dto/events";
import { Events } from "@prisma/client";
import { CreatePaymentRecieved } from "@/data/dto/Payment";
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
    // Extract Payment Entity
    const payment = body.payload.payment.entity;
    // get Amount and Payment id
    console.log("Recieved PAYMENT Payload", payment, "++==payment PAYLOAD");
    const { amount, id: paymentId } = payment;
    console.log("Recived AMOUNT ", amount, paymentId, "++==payment PAYLOAD");
    let createEventRetryLoop = DATABASE_CREATE_RETRY_LOOP_STARTS_FROM;
    let createEventFlag = false;
    //Retry loop upto Const.
    while (
      createEventRetryLoop <= MAX_DATABASE_CREATE_RETRY_LOOP &&
      !createEventFlag
    ) {
      try {
        // Insert the payment into database or throw the error
        console.log("INFO: Creating Payment Recieved");
        let isCreated = await CreatePaymentRecieved({
          amount,
          paymentId,
        });

        if (!isCreated) {
          console.log("PAYMENT SCHEMA FAILED TO CREATE");
          throw new Error("Failed to created ");
        }
        console.log("PAYMENT SCHEMA FAILED TO CREATE");
        createEventFlag = true;
        continue;
      } catch (error) {
        createEventRetryLoop++;
      }
    }
    console.log("INFO: UPDATING STATUS TO SUCCESS ");
    await updateEventToSucess({ id: event.id });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("FATAL: ERROR!", error, "++==error");
    await UpdateFailedCount(event.id, "Failed to create Payment order");
    return NextResponse.json(
      { success: false, message: "Failed to create Payment order" },
      { status: 400 }
    );
  }
}
