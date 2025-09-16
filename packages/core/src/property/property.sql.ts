import {
  bigserial,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { user } from '../auth/auth.sql';
import { generatePublicId } from '../utils/publicId';

export const property = pgTable(
  'property',
  {
    id: bigserial({ mode: 'number' }).primaryKey(),
    publicId: varchar('public_id', { length: 12 })
      .notNull()
      .unique()
      .default(generatePublicId()),

    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),

    strasse: varchar('strasse', { length: 255 }),
    hausnummer: varchar('hausnummer', { length: 255 }),
    plz: varchar('plz', { length: 255 }),
    stadt: varchar('stadt', { length: 255 }),
    land: varchar('land', { length: 255 }).default('DE'),

    wohnungsgroesse: integer('wohnungsgroesse'),
    kaufpreis: integer('kaufpreis'),
    nettokaltmieteAktuell: integer('nettokaltmiete_aktuell'),
    nettokaltmieteMarkt: integer('nettokaltmiete_markt'),
    hausgeld: integer('hausgeld'),
    umlagefahigeKosten: integer('umlagefahige_kosten'),
    nichtUmlagefahigeKosten: integer('nicht_umlagefahige_kosten'),
    kaufnebenkosten: integer('kaufnebenkosten'),
    grunderwerbsteuer: integer('grunderwerbsteuer'),
    verkehrswert: integer('verkehrswert'),
  },
  (table) => [uniqueIndex('public_id_idx').on(table.publicId)]
);

export type Property = typeof property.$inferSelect;
