
import { AppRouter } from "@/server/routers/user";
import { createTRPCReact } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>({});
