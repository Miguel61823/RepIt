DROP TABLE IF EXISTS member;

DROP TABLE IF EXISTS workout;

CREATE TABLE member(
  email TEXT,
  first_name TEXT,
  last_name TEXT
);

CREATE TABLE workout(
  id BIGSERIAL PRIMARY KEY,
  user_id REFERENCES user ON DELETE CASCADE,
  exercises jsonb
);

