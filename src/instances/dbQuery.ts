const LOGIN_QRY = "SELECT * FROM user_details WHERE msisdn = ?;";
// const ADD_SUBJECT_QRY = "INSERT INTO
const ADD_SUBJECT_QRY = "INSERT INTO subject (name, description) VALUES (?,?)";
const GET_SUBJECT_QRY = "SELECT * FROM subject WHERE id = ?";
const GET_ALL_SUBJECT_QRY = "SELECT * FROM subject";
/*Exams */
const ADD_EXAM_QRY =
  "INSERT INTO exam (title, duration, media_type, media_value, year, subject) VALUES (?, ?, ?, ?, ?, ?)";
const GET_EXAM_QRY = "SELECT * FROM exam WHERE id = ?";
const GET_ALL_EXAM_QRY = "SELECT * FROM exam";
const GET_EXAM_BY_SUBJECT_QRY = "SELECT * FROM exam WHERE subject = ?";
/* Exam Content */
const ADD_EXAM_CONTENT_QRY =
  "INSERT INTO exam_content (exam, exam_type, exam_link) VALUES (?, ?, ?)";
const GET_EXAM_CONTENT_QRY = "SELECT * FROM exam_content WHERE id = ?";
const GET_ALL_EXAM_CONTENT_QRY = "SELECT * FROM exam_content";

/* Lessons && Content */
const ADD_LESSON_QRY =
  "INSERT INTO lessons (title, duration,media_type, media_value, subject_id) VALUES (?, ?, ?, ?, ?)";
const GET_LESSON_BY_SUBJECT = "SELECT * FROM lessons WHERE subject_id = ?";

/* Topic */

const ADD_TOPIC_QRY =
  "INSERT INTO subject_topic (subject, title) VALUES (?, ?)";

const GET_TOPIC_BY_SUBJECT = "SELECT * FROM subject_topic WHERE subject = ?";

/* Payment */

const ADD_RECEIPT_QRY =
  "INSERT INTO receipts (trans_id, amount, period, user_id) VALUES (?, ?, ?, ?)";

/* Subscription */
const ADD_SUBSCRIPTION_QRY =
  "INSERT INTO subscriptions (user_id, trans_id, amount, period) VALUES (?, ?, ?, ?)";
// const insertQuery = (tableName: string ) => {
// String ADD_SUBJECT_QRY = `INSERT INTO ${tableName} ()
// }

export const db_query = {
  LOGIN_QRY,
  ADD_SUBJECT_QRY,
  GET_SUBJECT_QRY,
  GET_ALL_SUBJECT_QRY,
  ADD_EXAM_QRY,
  GET_EXAM_QRY,
  GET_ALL_EXAM_QRY,
  ADD_EXAM_CONTENT_QRY,
  GET_EXAM_CONTENT_QRY,
  GET_ALL_EXAM_CONTENT_QRY,
  GET_EXAM_BY_SUBJECT_QRY,
  ADD_LESSON_QRY,
  GET_LESSON_BY_SUBJECT,
  ADD_TOPIC_QRY,
  GET_TOPIC_BY_SUBJECT,
  ADD_RECEIPT_QRY,
  ADD_SUBSCRIPTION_QRY,
};
