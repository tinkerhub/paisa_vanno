
import { AppRouter } from "@/server/routers/payment";
import { createTRPCReact } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>({});
