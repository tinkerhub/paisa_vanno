import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/db";

export const appRouter = router({
  getPayment: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      const data = await db.payments. 
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
