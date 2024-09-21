import { initTRPC } from "@trpc/server";

// import superjson from "superjson";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  // transformer: superjson,
  // allowOutsideOfServer: true,
});

export const router = t.router;
// Base router and procedure
export const publicProcedure = t.procedure;

export const middleware = t.middleware;

// export const isAdmin = middleware(async (opts) => {
//   });

//   export const AdminProcedure = t.procedure.use(isAdmin);
