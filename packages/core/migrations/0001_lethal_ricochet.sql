CREATE TABLE "property" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"public_id" varchar(12) DEFAULT 'jpxeam5az90j' NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"strasse" varchar(255),
	"hausnummer" varchar(255),
	"plz" varchar(255),
	"stadt" varchar(255),
	"land" varchar(255) DEFAULT 'DE',
	"wohnungsgroesse" integer,
	"kaufpreis" integer,
	"nettokaltmiete_aktuell" integer,
	"nettokaltmiete_markt" integer,
	"hausgeld" integer,
	"umlagefahige_kosten" integer,
	"nicht_umlagefahige_kosten" integer,
	"kaufnebenkosten" integer,
	"grunderwerbsteuer" integer,
	"verkehrswert" integer,
	CONSTRAINT "property_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "public_id_idx" ON "property" USING btree ("public_id");