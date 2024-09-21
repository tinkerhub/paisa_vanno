import { Payments } from "@prisma/client";

export type TPaymentExcludedTimeStamp = Omit<Payments, "createdAt" | "updatedAt">;
