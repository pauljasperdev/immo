import { NotFoundError } from '@immo/core/errors';
import {
  createProperty,
  deletePropertyById,
  readPropertiesByUserId,
  readPropertyById,
  updatePropertyById,
} from '@immo/core/property';
import { TRPCError } from '@trpc/server';
import z from 'zod';
import { protectedProcedure, router } from '../trpc/trpc';

const propertyDataSchema = z.object({
  street: z.string().optional(),
  houseNumber: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  size: z.number().optional(),
  price: z.number().optional(),
  rentalIncome: z.number().optional(),
  rentalIncomeMarket: z.number().optional(),
  transferableExpenses: z.number().optional(),
  nonTransferableExpenses: z.number().optional(),
  closingCosts: z.number().optional(),
  realEstateTransferTax: z.number().optional(),
  marketValue: z.number().optional(),
});

export const propertyRouter = router({
  createProperty: protectedProcedure
    .input(propertyDataSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await createProperty({
        propertyData: input,
        userId: ctx.session.user.id,
      });

      if (result.isErr()) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: result.error.message,
        });
      }
      return result.value;
    }),

  readPropertyById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await readPropertyById({
        propertyId: input.id,
        userId: ctx.session.user.id,
      });

      if (result.isErr()) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: result.error.message,
        });
      }
      return result.value;
    }),

  readPropertiesByUserId: protectedProcedure.query(async ({ ctx }) => {
    const result = await readPropertiesByUserId({
      userId: ctx.session.user.id,
    });

    if (result.isErr()) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: result.error.message,
      });
    }
    return result.value;
  }),

  updatePropertyById: protectedProcedure
    .input(z.object({ id: z.number(), data: propertyDataSchema }))
    .mutation(async ({ ctx, input }) => {
      const result = await updatePropertyById({
        propertyId: input.id,
        propertyData: input.data,
        userId: ctx.session.user.id,
      });

      if (result.isErr()) {
        if (result.error instanceof NotFoundError) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: result.error.message,
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: result.error.message,
        });
      }
      return result.value;
    }),

  deletePropertyById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const result = await deletePropertyById({
        propertyId: input.id,
        userId: ctx.session.user.id,
      });

      if (result.isErr()) {
        if (result.error instanceof NotFoundError) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: result.error.message,
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: result.error.message,
        });
      }
      return result.value;
    }),
});
