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
  strasse: z.string().optional(),
  hausnummer: z.string().optional(),
  plz: z.string().optional(),
  stadt: z.string().optional(),
  land: z.string().optional(),
  wohnungsgroesse: z.number().optional(),
  kaufpreis: z.number().optional(),
  nettokaltmieteAktuell: z.number().optional(),
  nettokaltmieteMarkt: z.number().optional(),
  hausgeld: z.number().optional(),
  umlagefahigeKosten: z.number().optional(),
  nichtUmlagefahigeKosten: z.number().optional(),
  kaufnebenkosten: z.number().optional(),
  grunderwerbsteuer: z.number().optional(),
  verkehrswert: z.number().optional(),
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
