CREATE TYPE "public"."target_muscle" AS ENUM('abs', 'arms', 'back', 'bicep', 'calves', 'chest', 'core', 'full body', 'hamstrings', 'inner thigh', 'glutes', 'legs', 'lats', 'oblique', 'outer thigh', 'quads', 'shoulders', 'traps', 'triceps');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "machine" (
	"machine_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gym_id" uuid NOT NULL,
	"name" text NOT NULL,
	"target_muscle" "target_muscle" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "machine" ADD CONSTRAINT "machine_gym_id_gym_gym_id_fk" FOREIGN KEY ("gym_id") REFERENCES "public"."gym"("gym_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "gym_index" ON "machine" USING btree ("gym_id");--> statement-breakpoint
ALTER TABLE "gym" DROP COLUMN IF EXISTS "open_time";--> statement-breakpoint
ALTER TABLE "gym" DROP COLUMN IF EXISTS "close_time";