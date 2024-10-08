import { DATABASE_CREATE_RETRY_LOOP_STARTS_FROM, MAX_DATABASE_CREATE_RETRY_LOOP, MAX_EVENT_RETRY_WEBHOOK_COUNT } from "@/constants/handlers/Events";
import {
  createEventorThrow,
  getEventById,
  UpdateFailedCount,
} from "@/data/dto/events";
import { handlePaymentCapturedEvent } from "@/lib/handlers/handlePaymentCapturedEvent";
import { generateSignature } from "@/lib/utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const header = headers();
  // get razorpay signature
  const IncommingSignature = header.get("X-Razorpay-Signature");
  // get razorpay eventId as idempotency key.
  const eventId = header.get("x-razorpay-event-id");

  // check if both exists in first or return as invalid request.
  if (!IncommingSignature || !eventId) {
    return NextResponse.json({ success: false }, { status: 200 });
  }
  let body = await request.json();
  /// calculating signature from the body and secret
  // const generatedSignature = generateSignature(body);
  console.log(body);

  // check whether the generated and incomming are same, if so use the body and the body is securely send from razor-pay

  // check whether the event is already in database
  let DbEvent = await getEventById(eventId);
  console.log("Db event has been Triggered", DbEvent, "++==DbEvent Initial");
  switch (DbEvent?.status) {
    case "SUCCESS": {
      console.info("Db event is sucessfull", "==RAZORPAY");
      return NextResponse.json({ success: true }, { status: 200 });
    }
    case "FAILED": {
      console.error("Db event is Failed", "==RAZORPAY");
      if (DbEvent.FailedCount > MAX_EVENT_RETRY_WEBHOOK_COUNT) {
        return NextResponse.json(
          { success: false, message: DbEvent.description },
          { status: 200 }
        );
      }
    }
    case "PROCESSING": {
      console.info(
        "Payment is processing (Multiple request found)",
        "==RAZORPAY"
      );
      return NextResponse.json({ success: false }, { status: 405 });
    }

    case "PENDING": {
      // not Implimented.
      console.log("PENDING HAS NOT BEEN IMPLIMENTED");

      return NextResponse.json({ success: false, status: 430 });
    }
  }
  let createEventRetryLoop = DATABASE_CREATE_RETRY_LOOP_STARTS_FROM;
  let createEventFlag = false;
  // retry Loop default config.
  while (
    createEventRetryLoop <= MAX_DATABASE_CREATE_RETRY_LOOP &&
    !createEventFlag
  ) {
    try {
      // Insert the event into data-base
      

      DbEvent = await createEventorThrow({
        eventId,
        status: "PROCESSING",
      });
      console.log(
        "New EVENT HAS BEEN CREATED",
        DbEvent,
        "++==DbEvent CREATE"
      );
      createEventFlag = true;
      continue;
    } catch (error) {
      console.log(error);
      createEventRetryLoop++;
    }
  }
  try {
    if (!DbEvent || !DbEvent?.id) {
      console.log(
        "FATAL: DB EVENT IS NOT FOUND!",
        DbEvent,
        "++==DbEvent"
      );
      return NextResponse.json({ success: true }, { status: 425 });
    }
    switch (body.event) {
      
      case "payment.captured": {
        console.log(
          "INFO: Paymnet Captured Has been triggered",
          DbEvent,
          "++==DbEvent Initial"
        );
        return await handlePaymentCapturedEvent({
          body,
          event: DbEvent,
        });
      }
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (DbEvent?.id) {
      await UpdateFailedCount(DbEvent.id);
      return NextResponse.json({ success: true }, { status: 400 });
    }
    return NextResponse.json({ success: true }, { status: 400 });
  }
}
