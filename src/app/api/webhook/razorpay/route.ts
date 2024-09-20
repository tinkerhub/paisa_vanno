import { getEventById } from "@/data/dto/events";
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
  const generatedSignature = generateSignature(body);
  console.log(body);

  // check whether the generated and incomming are same, if so use the body and the body is securely send from razor-pay
  if (generatedSignature !== IncommingSignature) {
    // throw a valid error.
    // Respond with 200
    return NextResponse.json({ success: false }, { status: 200 });
  }

  // Insert the event into data-base

  // check whether the event is already in database
  let DbEvent = await getEventById(eventId);
}
