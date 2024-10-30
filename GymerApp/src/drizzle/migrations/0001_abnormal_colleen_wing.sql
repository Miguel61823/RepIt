DROP TABLE "nodes";--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "data" text NOT NULL;