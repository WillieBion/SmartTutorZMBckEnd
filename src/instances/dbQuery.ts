const LOGIN_QRY = "SELECT * FROM user_details WHERE msisdn = ?;";
// const ADD_SUBJECT_QRY = "INSERT INTO 
const ADD_SUBJECT_QRY = "INSERT INTO subject (name, description) VALUES (?,?)";
const GET_SUBJECT_QRY = "SELECT * FROM subject WHERE id = ?";
const GET_ALL_SUBJECT_QRY = "SELECT * FROM subject";
/*Exams */
const ADD_EXAM_QRY = "INSERT INTO exam (title, description, subject, year) VALUES (?, ?, ?, ?)";
const GET_EXAM_QRY = "SELECT * FROM exam WHERE id = ?";
const GET_ALL_EXAM_QRY = "SELECT * FROM exam";
/* Exam Content */
const ADD_EXAM_CONTENT_QRY = "INSERT INTO exam_content (exam, exam_type, exam_link) VALUES (?, ?, ?)";
const GET_EXAM_CONTENT_QRY = "SELECT * FROM exam_content WHERE id = ?";
const GET_ALL_EXAM_CONTENT_QRY = "SELECT * FROM exam_content";


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
  GET_ALL_EXAM_CONTENT_QRY
};
