DROP TABLE IF EXISTS user;

DROP TABLE IF EXISTS workout_instance;

CREATE TABLE user(
  email TEXT,
  first_name TEXT
);

CREATE TABLE workout_instance(
  id BIGSERIAL PRIMARY KEY,
  user_id REFERENCES user ON DELETE CASCADE,
  date_completed TIMESTAMPTZ,
  workout_id REFERENCES workout(id),
  exercises jsonb
);

