CREATE TABLE "link" (
	"id" bigint PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"hash_value" text NOT NULL,
	CONSTRAINT "link_url_unique" UNIQUE("url"),
	CONSTRAINT "link_hash_value_unique" UNIQUE("hash_value")
);
