import {
  bigserial,
  index,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { user } from '../auth/auth.sql';
import { generatePublicId } from '../public-id';

export const property = pgTable(
  'property',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    publicId: varchar('public_id', { length: 12 })
      .notNull()
      .unique()
      .default(generatePublicId()),

    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),

    // translations for german terms comming for here:
    // https://www.m2square.eu/en/buy-apartment-in-berlin-services/definition-of-terms-used/
    street: varchar('street', { length: 255 }),
    houseNumber: varchar('house_number', { length: 255 }),
    postalCode: varchar('postal_code', { length: 255 }),
    city: varchar('city', { length: 255 }),
    country: varchar('country', { length: 255 }).default('DE'),

    size: real('size_sqr_m'),
    price: real('price'),
    // nettokaltmiete
    rentalIncome: real('rental_income'),
    // nettokaltmiete_markt
    rentalIncomeMarket: real('rental_income_market'),
    // umlagefahige_kosten
    transferableExpenses: real('transferable_expenses'),
    // nicht_umlagefahige_kosten
    nonTransferableExpenses: real('non_transferable_expenses'),
    // kaufnebenkosten
    closingCosts: real('closing_costs'),
    // grunderwerbsteuer
    realEstateTransferTax: real('real_estate_transfer_costs'),
    // verkehrswert (market value)
    marketValue: real('market_value'),
  },
  (table) => [
    uniqueIndex('public_id_idx').on(table.publicId),
    index('user_id_idx').on(table.userId),
  ]
);

export type Property = typeof property.$inferSelect;
