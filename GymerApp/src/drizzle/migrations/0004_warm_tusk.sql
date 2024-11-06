ALTER TABLE "facility" ALTER COLUMN "lat" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "lon" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "facility" ADD CONSTRAINT "facility_osm_id_unique" UNIQUE("osm_id");