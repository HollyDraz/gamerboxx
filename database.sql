CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "role" varchar,
  "created_at" timestamp
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY,
  "game_title" varchar,
  "body" text,
  "user_id" integer,
  "status" varchar,
  "created_at" timestamp,
  "published" year,
  "console" text,
  "user_score" integer
);

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("following_user_id") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("followed_user_id") REFERENCES "users" ("id");
