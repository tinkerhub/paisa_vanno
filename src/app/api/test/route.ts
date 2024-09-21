import { db } from "@/db";
import { nanoid } from "@reduxjs/toolkit";
import { NextResponse } from "next/server";
function getRandomNumber() {
  return Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
}
export async function POST(req: NextResponse) {
  try {
    const data = await db.payments.create({
      data: {
        recievedAmount: getRandomNumber(),
        paymentId: nanoid(),
      },
    });
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Recieved" }, { status: 400 });
  }
}
