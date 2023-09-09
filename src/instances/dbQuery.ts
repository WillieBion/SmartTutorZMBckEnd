const LOGIN_QRY = "SELECT * FROM user_details WHERE msisdn = ?;";
// const ADD_SUBJECT_QRY = "INSERT INTO 
const ADD_SUBJECT_QRY = "INSERT INTO subject (name, description) VALUES (?,?)";
const GET_SUBJECT_QRY = "SELECT * FROM subject WHERE id = ?";
const GET_ALL_SUBJECT_QRY = "SELECT * FROM subject";

// const insertQuery = (tableName: string ) => {
// String ADD_SUBJECT_QRY = `INSERT INTO ${tableName} () 
// }

export const db_query = {
  LOGIN_QRY,
  ADD_SUBJECT_QRY,
  GET_SUBJECT_QRY,
  GET_ALL_SUBJECT_QRY
};
