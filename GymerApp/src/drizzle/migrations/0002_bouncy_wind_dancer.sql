ALTER TABLE "facility" ALTER COLUMN "lat" SET DATA TYPE numeric(10, 7);--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "lon" SET DATA TYPE numeric(10, 7);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "location_index" ON "facility" USING btree ("lat","lon");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "osm_index" ON "facility" USING btree ("osm_id");