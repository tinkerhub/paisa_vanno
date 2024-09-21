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
      let page = cursor ?? 1;
      const totalAmount = await db.payments.aggregate({
        _sum: {
          recievedAmount: true,
        },
      });

      const data = await db.payments.findMany({
        cursor: {
          id: page,
        },
        take: INFINITE_QUERY_LIMIT + 1,
        select: {
          id: true,
          paymentId: true,
          recievedAmount: true,
          email: true,
          name: true,
        },
      });
      if (!data.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong",
        });
      }
      let nextCursor = page;
      if (data.length > INFINITE_QUERY_LIMIT) {
        const nextItem = data.pop();
        nextCursor = nextItem?.id ? nextItem?.id : page;
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
