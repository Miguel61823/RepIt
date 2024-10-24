CREATE TABLE IF NOT EXISTS "gym" (
	"gym_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"open_time" integer NOT NULL,
	"close_time" integer NOT NULL
);
