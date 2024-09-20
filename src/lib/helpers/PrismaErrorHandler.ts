import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export function ErrorLogger(error: unknown) {
  if (error instanceof PrismaClientValidationError) {
    console.error("Client validation Error", "==ERROR");
    console.error("Issue:", error.message, "==ERROR");
    return;
  }
  if (error instanceof PrismaClientUnknownRequestError) {
    console.error("Unknown client Request error", "==ERROR");
    console.error(error.message, "==ERROR");
    return;
  }
  if (error instanceof PrismaClientKnownRequestError) {
    console.error("Known client Request error", "==ERROR");
    console.error(error.message, "==ERROR");
    return;
  }
  if (error instanceof PrismaClientRustPanicError) {
    console.error("Prisma Engine Panic Error", "==ERROR");
    console.error(error.message, "==ERROR");
    return;
  }
}
