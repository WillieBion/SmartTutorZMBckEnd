const CREATE_USER_QUERY = "INSERT INTO user_details (msisdn, user_name, password, user_role, user_status, device_id) VALUES (?, ? ,?, ?, ?, ?)";
const GET_USER_DETAILS = "SELECT * FROM user_details WHERE user_name = ?";
const LOGIN_QRY = "SELECT * FROM user_details WHERE msisdn = ?;";
const DELETE_USER_DETAILS = "DELETE FROM user_details WHERE user_name = ?"
/* User status */
const GET_UNSUBSCRIBED_USERS = "SELECT * from user_details WHERE user_status = ?"
// const GET_USER_SUBSCRIPTION_STATUS = "SELECT * ";
// const ADD_SUBJECT_QRY = "INSERT INTO
const ADD_SUBJECT_QRY =
  "INSERT INTO subject (name, pictureURL, lesson_title, lesson_description, exam_title, exam_description) VALUES (?,?, ?, ?,?, ?)";
const GET_SUBJECT_QRY = "SELECT * FROM subject WHERE id = ?";
const GET_ALL_SUBJECT_QRY = "SELECT * FROM subject";
/*Exams */
const ADD_EXAM_QRY =
  "INSERT INTO exam (title, duration, media_type, media_value, year, subject_id) VALUES (?, ?, ?, ?, ?, ?)";
const GET_EXAM_QRY = "SELECT * FROM exam WHERE id = ?";
const GET_ALL_EXAM_QRY = "SELECT * FROM exam";
const GET_EXAM_BY_SUBJECT_QRY = "SELECT * FROM exam WHERE subject_id = ?";
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
  "INSERT INTO subscriptions (user_id, trans_id, referral_id, subscription) VALUES (?, ?, ?, ?)";
const GET_SUBSCRIPTION_DETAILS_QRY = "SELECT * FROM subscription_details";
const GET_SUBSCRIPTION_DETAILS_BY_QRY =
  "SELECT * FROM subscription_details WHERE id = ?";
const GET_SUBSCRIPTION_STATUS_QRY = "SELECT * FROM subscriptions WHERE user_id = ?";

/* Update Password */
const UPDATE_PASSWORD_QRY =
  "UPDATE user_details SET password = ? WHERE user_name = ?";

const GET_PASSWORD_QRY =
  "SELECT password FROM user_details WHERE user_name = ?";

/* Update user_status */
const UPDATE_USER_STATUS_QRY =
  "UPDATE user_details SET user_status = ? WHERE user_name = ?";

const GET_TRANSID_QRY = "SELECT trans_id FROM subscriptions WHERE user_id = ?";

const GET_USER_ID_BY_TRANSID =
  "SELECT user_id FROM subscriptions WHERE trans_id = ?";

const VERIFY_USERNAME_QRY =
  "SELECT user_name FROM user_details WHERE user_name = ?";

//sessions
const GET_SESSION_QRY = "SELECT * FROM sessions WHERE user_name = ?";
const GET_SESSION_AUTH_STATUS_QRY = "SELECT * FROM sessions WHERE user_name = ? AND device_id = ?";
const ADD_SESSION_QRY = "INSERT INTO sessions (user_name, device_id, is_valid) VALUES (?, ?, ?)";
const DELETE_SESSION_QRY = "DELETE FROM sessions WHERE user_name = ?";
// const insertQuery = (tableName: string ) => {
// String ADD_SUBJECT_QRY = `INSERT INTO ${tableName} ()
// }

//OTP
const CREATE_OTP_QRY = "INSERT INTO otp (user, otp) VALUES (?, ?)";
const GET_OTP_QRY = "SELECT * FROM otp WHERE user = ? AND otp = ?";

//Referral_Code
const CREATE_REFERRAL_CODE = "INSERT INTO referral_codes (code, userID) VALUES (?, ?)";


//ADMIN STATS
const ADMIN_GET_USER_DATA = `SELECT
ud.msisdn,
ud.user_status,
sd.price AS subscription_amount,
rc.code AS referral_code,
sub.created_at AS date_subscribed
FROM
user_details ud
JOIN
subscriptions sub ON ud.msisdn = sub.user_id
JOIN
subscription_details sd ON sub.subscription = sd.id
LEFT JOIN
referral_codes rc ON ud.msisdn  = rc.userID 
WHERE
sub.is_valid = 1`;

const ADMIN_GET_USER_DATA_WITH_PRICE = `SELECT
sub.user_id AS student_msisdn,
sub.referral_id AS referral_code,
sd.price AS subscription_price,
sub.created_at AS date_subscribed
FROM
subscriptions sub
JOIN
subscription_details sd ON sub.subscription = sd.id
WHERE
sub.is_valid = 1
GROUP BY
sub.user_id, sub.referral_id, sd.price, sub.created_at`;

const ADMIN_GET__WEEKLY_APP_SUBSCRIBERS = `SELECT

DATE(created_at) AS registration_date,

COUNT(id) AS subscriptions,

SUM(COUNT(id)) OVER (ORDER BY DATE(created_at) ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_subs

FROM

subscriptions s

WHERE

created_at >= CURRENT_DATE - INTERVAL '7' DAY

GROUP BY DATE(created_at)

ORDER BY registration_date

`;

const ADMIN_GET_WEEKLY_APP_USERS = `SELECT

DATE(created_at) AS registration_date,

COUNT(id) AS new_users,

SUM(COUNT(id)) OVER (ORDER BY DATE(created_at) ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_users

FROM

user_details

WHERE

created_at >= CURRENT_DATE

GROUP BY DATE(created_at)

ORDER BY registration_date

`;


//daily number of new users, subscription and referrals



const GET_DAILY_NUMBER_NEW_USERS_SUBS_RC = `SELECT
    COUNT(DISTINCT CASE WHEN ud.user_role = 1 AND DATE(ud.created_at) = CURRENT_DATE THEN ud.msisdn END) AS new_users_count,
    COUNT(DISTINCT CASE WHEN DATE(sub.created_at) = CURRENT_DATE THEN sub.id END) AS subscriptions_count,
    COUNT(DISTINCT CASE WHEN DATE(rc.created_at) = CURRENT_DATE THEN sub.id END) AS referrals_used_count
FROM
    user_details ud
LEFT JOIN
    subscriptions sub ON ud.msisdn = sub.user_id
LEFT JOIN
    referral_codes rc ON ud.msisdn = rc.userID 
WHERE
    sub.is_valid = 1`;

const GET_TEACHER_RC_SUBS = `SELECT
teachers.msisdn AS teacher_msisdn,
rc.code AS referral_code,
COUNT(DISTINCT CASE WHEN sub.subscription = '1' THEN sub.id END) AS monthly_subscription_count,
COUNT(DISTINCT CASE WHEN sub.subscription = '2' THEN sub.id END) AS termly_subscription_count
FROM
user_details teachers
JOIN
referral_codes rc ON teachers.msisdn = rc.userID
LEFT JOIN
subscriptions sub ON rc.code = sub.referral_id AND sub.is_valid = 1
WHERE
teachers.user_role  = 4  
GROUP BY
teachers.msisdn, rc.code`;

const GET_ADMIN_RC_SUBS = `SELECT
sales_manager.msisdn AS sales_msisdn,
rc.code AS referral_code,
COUNT(DISTINCT CASE WHEN sub.subscription = '1' THEN sub.id END) AS monthly_subscription_count,
COUNT(DISTINCT CASE WHEN sub.subscription = '2' THEN sub.id END) AS termly_subscription_count
FROM
user_details sales_manager
JOIN
referral_codes rc ON sales_manager.msisdn = rc.userID
LEFT JOIN
subscriptions sub ON rc.code = sub.referral_id AND sub.is_valid = 1
WHERE
sales_manager.user_role  = 3 
GROUP BY
sales_manager.msisdn, rc.code`;

const GET_COUNT_USERS_ACTIVE_INACTIVE_TEACHERS = `SELECT
COUNT(DISTINCT msisdn) AS total_users,
COUNT(DISTINCT CASE WHEN user_role = 1 AND user_status = 2 THEN msisdn END) AS subscribed_users,
COUNT(DISTINCT CASE WHEN user_role = 1 AND user_status != 2 THEN msisdn END) AS unsubscribed_users,
COUNT(DISTINCT CASE WHEN user_role = 4 THEN msisdn END) AS number_of_teachers,
COUNT(DISTINCT CASE WHEN user_role = 3 THEN msisdn END) AS number_of_sales_managers,
SUM(CASE WHEN user_role = 1 AND user_status = 2 THEN sd.price  ELSE 0 END) AS subscription_total
FROM
user_details ud
LEFT JOIN
subscriptions sub ON ud.msisdn = sub.user_id AND sub.is_valid = 1
LEFT JOIN
subscription_details sd ON sub.subscription = sd.id`

const GET_SUBS_RC_TEACHER = `SELECT
teachers.msisdn AS teacher_msisdn,
rc.code AS teacher_referral_code,
COUNT(DISTINCT CASE WHEN sub.subscription = '1' THEN sub.id END) AS monthly_subscription,
COUNT(DISTINCT CASE WHEN sub.subscription = '2' THEN sub.id END) AS termly_subscription
FROM
user_details teachers
JOIN
referral_codes rc ON teachers.msisdn = rc.userID
LEFT JOIN
subscriptions sub ON rc.code = sub.referral_id AND sub.is_valid = 1
WHERE
teachers.user_role = 4 
GROUP BY
teachers.msisdn, rc.code`;


///Sales Managers

const GET_TEACHERS_UNDER_SALES_MANAGER = `
SELECT 
    t.teacher_msisdn ,
    rc.code,
    SUM(CASE WHEN s.subscription = 1 THEN 1 ELSE 0 END) AS monthly_subscriptions,
    SUM(CASE WHEN s.subscription = 2 THEN 1 ELSE 0 END) AS termly_subscriptions
FROM 
    teachers t
JOIN 
    sales_managers sm ON sm.id  = t.sales_manager 
JOIN 
    referral_codes rc ON rc.userID  = t.teacher_msisdn 
LEFT JOIN 
    subscriptions s ON s.referral_id  = rc.code 
GROUP BY 
    t.teacher_msisdn, sm.id, rc.code`;


//Count of Teachers under sales

const GET_COUNT_TEACHERS_UNDER_SALES_MANAGER = `
SELECT COUNT(*) AS total_number_of_teachers from teachers t 
where t.sales_manager = ?`;

//Count of referral under sales manager - I believe this should be teachers referral codes under sales manager - need refining

const GET_COUNT_REFERRALS_USED_UNDER_SALES_MANAGER = `
SELECT 
    COUNT(DISTINCT rc.code) AS referral_codes,
    COUNT(DISTINCT s.subscription) AS daily_subscriptions 
FROM 
    sales_managers sm 
JOIN 
    referral_codes rc ON rc.userID = sm.msisdn 
JOIN 
    subscriptions s ON s.referral_id = rc.code;
`

/* Query function*/

const deleteQuery = (table: string, column: string) => {
  return `DELETE FROM ${table} WHERE ${column} = ?`
}

const updateQuery = (table: string, column: string, condition: string, isUpdateAll: boolean | undefined | null) => {
  if (!isUpdateAll) {
    return `UPDATE ${table} SET ${column} = ? WHERE ${condition} = ?`

  } else {
    return `UPDATE ${table} SET ${column} WHERE ${condition} = ?`

  }
}

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
  UPDATE_PASSWORD_QRY,
  GET_PASSWORD_QRY,
  UPDATE_USER_STATUS_QRY,
  GET_TRANSID_QRY,
  VERIFY_USERNAME_QRY,
  GET_SUBSCRIPTION_DETAILS_QRY,
  GET_SUBSCRIPTION_DETAILS_BY_QRY,
  GET_USER_DETAILS,
  GET_USER_ID_BY_TRANSID,
  GET_SESSION_QRY,
  ADD_SESSION_QRY,
  DELETE_SESSION_QRY,
  DELETE_USER_DETAILS,
  GET_SESSION_AUTH_STATUS_QRY,
  GET_UNSUBSCRIBED_USERS,
  CREATE_OTP_QRY,
  GET_OTP_QRY,
  GET_SUBSCRIPTION_STATUS_QRY,
  CREATE_USER_QUERY,
  CREATE_REFERRAL_CODE,
  ADMIN_GET_USER_DATA,
  ADMIN_GET_USER_DATA_WITH_PRICE,
  ADMIN_GET__WEEKLY_APP_SUBSCRIBERS,
  ADMIN_GET_WEEKLY_APP_USERS,
  GET_DAILY_NUMBER_NEW_USERS_SUBS_RC,
  GET_TEACHER_RC_SUBS,
  GET_ADMIN_RC_SUBS,
  GET_COUNT_USERS_ACTIVE_INACTIVE_TEACHERS,
  GET_SUBS_RC_TEACHER,
  GET_TEACHERS_UNDER_SALES_MANAGER,
  GET_COUNT_TEACHERS_UNDER_SALES_MANAGER,
  GET_COUNT_REFERRALS_USED_UNDER_SALES_MANAGER,
  deleteQuery,
  updateQuery
};
