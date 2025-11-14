CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"page" varchar(255) NOT NULL,
	"section" varchar(255) NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"last_updated_at" timestamp
);
