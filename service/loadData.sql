DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT
);

CREATE INDEX product_idx ON products (id);

\COPY products FROM '../files/product.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE questions (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products (id),
  body TEXT,
  date_written BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  reported BOOLEAN,
  helpful SMALLINT
);

CREATE INDEX question_idx on questions (id);

\COPY questions FROM '../files/questions.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE answers (
  id BIGSERIAL PRIMARY KEY,
  question_id BIGSERIAL REFERENCES questions (id),
  body TEXT,
  date_written BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  reported BOOLEAN,
  helpful SMALLINT
);

CREATE INDEX answer_idx ON answers (id);

\COPY answers FROM '../files/answers.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE photos (
  id BIGINT PRIMARY KEY,
  answer_id BIGSERIAL REFERENCES answers (id),
  photo_url TEXT
);

CREATE INDEX photo_idx ON photos (id);

\COPY photos FROM '../files/answers_photos.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE questions ALTER COLUMN date_written TYPE timestamp USING to_timestamp(date_written / 1000);

ALTER TABLE answers ALTER COLUMN date_written TYPE timestamp USING to_timestamp(date_written / 1000);
