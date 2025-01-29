CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR NOT NULL,
  "role" VARCHAR NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "game_title" VARCHAR NOT NULL,
  "body" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL,
  "status" VARCHAR NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "published" INTEGER CHECK (published >= 1900 AND published <= EXTRACT(YEAR FROM CURRENT_DATE)), -- Ensuring a reasonable year
  "console" TEXT NOT NULL,
  "user_score" INTEGER CHECK (user_score >= 0 AND user_score <= 100),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

-- Define follows table (for user relationships)
CREATE TABLE "follows" (
  "id" SERIAL PRIMARY KEY,
  "following_user_id" INTEGER NOT NULL,
  "followed_user_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("following_user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("followed_user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
  UNIQUE ("following_user_id", "followed_user_id") -- Prevent duplicate follows
);
