DROP INDEX IF EXISTS "gym_index";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "facility_index" ON "machine" USING btree ("facility_id");