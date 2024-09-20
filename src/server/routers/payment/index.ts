import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  getPaymentTotal: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor } = input;
      const totalAmount = await db.payments.aggregate({
        _sum: {
          recievedAmount: true,
        },
      });

      const data = await db.payments.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: 20,
      });
      if (!data.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong",
        });
      }
      let nextCursor = 1;
      return {
        response: data,
        totalAmount: totalAmount._sum,
        nextCursor,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
