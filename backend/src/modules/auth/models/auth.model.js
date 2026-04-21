/**
 * Auth Model (Entity)
 */
module.exports = {
  account_id: Number,
  role_id: Number,
  full_name: String,
  email: String,
  password: { type: String, select: false },
  phone: String,
  status: String,
  last_login: Date,
  created_at: Date
};
