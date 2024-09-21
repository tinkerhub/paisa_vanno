import { db } from "@/db";
function getRandomNumber() {
  return Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
}
export async function POST() {
  try {
    await db.payments.create({
      data: {
        recievedAmount: getRandomNumber(),
        paymentId: `hello+world ${getRandomNumber()}`
      },
    });
  } catch (error) {}
}
