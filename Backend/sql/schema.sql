DROP TABLE IF EXISTS user;

DROP TABLE IF EXISTS workout_instance;
DROP TABLE IF EXISTS exercise_instance;
DROP TABLE IF EXISTS set_instance;

CREATE TABLE user(
  email TEXT,
  first_name TEXT
);

CREATE TABLE workout_instance(
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT,
  date_completed TIMESTAMPTZ, 
  workout_id REFERENCES workout(id),
);
CREATE TABLE exercise_instance(
  id BIGSERIAL PRIMARY KEY,
  workout_instance_id REFERENCES workout_instance(id),
  exercise_id REFERENCES exercise(id),
);
CREATE TABLE set_instance(
  id BIGSERIAL PRIMARY KEY,
  order INT,
  weight INT,
  reps INT,
  machine TEXT,
  exercise_instance_id REFERENCES exercise_instance(id),
);

