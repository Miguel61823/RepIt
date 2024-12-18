CREATE TYPE "public"."node_type_enum" AS ENUM('group', 'metric');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise" (
	"exercise_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"workout_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facility" (
	"facility_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"osm_id" text NOT NULL,
	"name" text NOT NULL,
	"leisure" text NOT NULL,
	"lat" integer NOT NULL,
	"lon" integer NOT NULL,
	"address" text NOT NULL,
	"accessibility" text NOT NULL,
	"opening_hours" text,
	"website" text,
	"phone" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "machine" (
	"machine_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"facility_id" uuid NOT NULL,
	"name" text NOT NULL,
	"identifier" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"data" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sets" (
	"set_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exercise_id" uuid NOT NULL,
	"reps" integer,
	"weight" integer,
	"order" integer NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout" (
	"workout_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"date_completed" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise" ADD CONSTRAINT "exercise_workout_id_workout_workout_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("workout_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "machine" ADD CONSTRAINT "machine_facility_id_facility_facility_id_fk" FOREIGN KEY ("facility_id") REFERENCES "public"."facility"("facility_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sets" ADD CONSTRAINT "sets_exercise_id_exercise_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("exercise_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workout_index" ON "exercise" USING btree ("workout_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "gym_index" ON "machine" USING btree ("facility_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_session_index" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "exercise_index" ON "sets" USING btree ("exercise_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_index" ON "workout" USING btree ("user_id");