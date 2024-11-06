ALTER TABLE "facility" ALTER COLUMN "lat" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "facility" ALTER COLUMN "lon" SET DATA TYPE double precision;--> statement-breakpoint
DROP TYPE "public"."node_type_enum";