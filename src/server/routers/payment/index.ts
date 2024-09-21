import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { INFINITE_QUERY_LIMIT } from "@/constants/handlers/infinity";

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
      const limit = input.limit ?? INFINITE_QUERY_LIMIT;

      const totalAmount = await db.payments.aggregate({
        _sum: {
          recievedAmount: true,
        },
      });

      const data = await db.payments.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: 2,
      });
      if (!data.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong",
        });
      }

      let nextCursor: typeof cursor | undefined = undefined;

      if (data.length > limit) {
        const nextItem = data.pop();
        nextCursor = nextItem?.id;
      }
      return {
        response: data,
        totalAmount: totalAmount._sum.recievedAmount,
        nextCursor,
        hasNextPage: nextCursor ? true : false,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
