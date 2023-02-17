DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;


CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL GENERATED ALWAYS AS IDENTITY,
  PRIMARY KEY (product_id)
);

COPY products
FROM '/Users/tylertowery/Desktop/HackReactor/SDC/qa_service/files/product.csv'
WITH (FORMAT csv, HEADER true);

CREATE TABLE questions (
  product_id INT,
  question_id SERIAL GENERATED ALWAYS AS IDENTITY,
  question_body TEXT,
  question_date TEXT,
  asker_name TEXT,
  asker_email TEXT,
  question_helpfulness SMALLINT,
  reported BOOLEAN,
  PRIMARY KEY (question_id),
  CONSTRAINT fk_product,
    FOREIGN KEY (product_id)
      REFERENCES products(product_id)
);

COPY questions
FROM '/Users/tylertowery/Desktop/HackReactor/SDC/qa_service/files/questions.csv'
WITH (FORMAT csv, HEADER true);

CREATE TABLE answers (
  question_id INT,
  answer_id SERIAL GENERATED ALWAYS AS IDENTITY,
  answer_body TEXT,
  answer_date TEXT,
  answerer_name TEXT,
  answer_helpfulness SMALLINT,
  PRIMARY KEY (answer_id),
  CONSTRAINT fk_question,
    FOREIGN KEY (question_id)
      REFERENCES questions(question_id)
);

COPY answers
FROM '/Users/tylertowery/Desktop/HackReactor/SDC/qa_service/files/answers.csv'
WITH (FORMAT csv, HEADER true);

CREATE TABLE photos (
  answer_id INT ,
  photo_id SERIAL GENERATED ALWAYS AS IDENTITY,
  photo_url TEXT,
  PRIMARY KEY (photo_id),
  CONSTRAINT fk_answer,
    FOREIGN KEY (answer_id)
      REFERENCES answers(answer_id)
);

COPY photos
FROM '/Users/tylertowery/Desktop/HackReactor/SDC/qa_service/files/answers_photos.csv'
WITH (FORMAT csv, HEADER true);
