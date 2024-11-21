CREATE TABLE IF NOT EXISTS "equipment" (
	"equipment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"facility_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"condition" text NOT NULL,
	"description" text,
	"maintenance_date" timestamp,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "machines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"osm_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"identifier" text NOT NULL,
	"type" text,
	"condition" text,
	"description" text,
	"maintenance_date" timestamp,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "machine";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "equipment" ADD CONSTRAINT "equipment_facility_id_facility_facility_id_fk" FOREIGN KEY ("facility_id") REFERENCES "public"."facility"("facility_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "machines" ADD CONSTRAINT "machines_osm_id_facility_facility_id_fk" FOREIGN KEY ("osm_id") REFERENCES "public"."facility"("facility_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
