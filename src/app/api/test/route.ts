import { db } from "@/db";
import { NextResponse } from "next/server";
function getRandomNumber() {
  return Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
}
export async function POST() {
  try {
    await db.payments.create({
      data: {
        recievedAmount: getRandomNumber(),
        paymentId: `hello+world ${getRandomNumber()}`,
      },
    });
    return NextResponse.json({ message: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: true }, { status: 200 });
  }
}
