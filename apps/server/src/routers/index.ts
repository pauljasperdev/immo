import {
  createCallerFactory,
  protectedProcedure,
  publicProcedure,
  router,
} from '../trpc/trpc';
import { propertyRouter } from './property';

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return 'OK';
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: 'This is private',
      user: ctx.session.user,
    };
  }),
  property: propertyRouter,
});
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
