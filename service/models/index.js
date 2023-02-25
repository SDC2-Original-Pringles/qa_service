require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PW,
  db: process.env.DB,
  port: process.env.DBPORT,
});
client.connect();

module.exports = {
  readAnswers(questionid, page = 1, count = 5) {
    const query = {
      name: `fetch ${questionid}`,
      text: `SELECT json_build_object(
        'question', ${questionid},
        'page', 1,
        'count', 5,
        'results', (SELECT json_agg(row_to_json(answers))
          FROM (
            SELECT
              a.id as answer_id,
              a.body as body,
              a.date_written as date,
              a.answerer_name as answerer_name,
              a.helpful as helpfulness,
              json_agg(json_build_object(
                'id', p.id,
                'url', p.photo_url
              )) AS photos
            FROM answers a
            LEFT JOIN photos p ON a.id = p.answer_id
            WHERE question_id = ${questionid} and reported = false
            GROUP BY a.id
            LIMIT ${count} OFFSET ${page}
          ) answers
        )
      )`,
    };

    return client.query(query);
  },

  updateHelpfulQuestion(questionid, page = 1, count = 5) {
    const query = {
      name: 'udpate-helpful-question',
      text: '',
      values: [questionid],
    };
    return client.query(query, query.values);
  },
};

// WITH questions as (
//   SELECT id as question_id,
//   body as question_body,
//   date_written as question_date,
//   asker_name,
//   helpful as question_helpfulness,
//   reported,
//   product_id FROM questions
// ), answers as (
//      SELECT * FROM answers
//    ) SELECT id,
//    body,
//    date_written,
//    asker_name,
//    questions.helpful,
//    questions.reported
//    FROM questions
//    LEFT JOIN answers ON questions.question_id = answers.question_id
//    WHERE product_id = $1
// ), [productid]);
// 'SELECT * FROM questions LEFT JOIN answers ON questions.id = answers.question_id WHERE product_id = $1'

// SELECT json_build_object(
//   'users', (SELECT json_agg(row_to_json("user")) from "user"),
//   'teams', (SELECT json_agg(row_to_json("team")) from "team")
// )

// question id = answer question_id

// `SELECT json_build_object(
//   'product_id', 5,
//   'results', (SELECT json_agg(row_to_json(questions))
//     FROM (
//       SELECT
//         q.id AS question_id,
//         q.body AS question_body,
//         (SELECT to_char(to_timestamp(q.answer_date/1000),
//         'YYYY-MM-DD"T"HH24:MI:SS.MSZ')) AS question_date,
//         q.asker_name AS asker_name,
//         q.helpfulness AS question_helpfulness,
//         q.reported AS reported
//         FROM questions
//         (SELECT json_build_object(
//           'answers', (SELECT json_build_object(
//             'a.id', (SELECT json_build_object(
//               'id', a.id,
//               'body', a.answer_body,
//               'date', (SELECT to_char(to_timestamp(a.answer_date/1000),
//               'YYYY-MM-DD"T"HH24:MI:SS.MSZ')),
//               'answerer_name', a.answerer_name,
//               'helpfulness', a.answer_helpfulness,
//               'photos', (SELECT json_agg(json_strip_nulls(json_build_object(
//                 'id', p.id,
//                 'url', p.url
//               )))
//               FROM answers a
//               LEFT JOIN photos p ON a.id = p.answer_id
//               GROUP BY a.id
//             )) AS answer_info
//           ))
//         )) AS answers
//       FROM questions q
//       WHERE q.product_id=5 AND q.reported=false
//       GROUP BY q.id
//       LIMIT 5 OFFSET 1
//     )
//   ) AS questions
// )`
