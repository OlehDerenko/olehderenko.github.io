const sql = require("../sql");

class UsersService {
  getAll() {
    return sql`SELECT * FROM users`;
  }

  getTeachers() {}

  getStudents() {}

  getClasses() {
    return sql`SELECT * FROM classes`;
  }

  getUserByEmail(email) {
    return sql`SELECT id, full_name, email, role, password FROM users WHERE email=${email}`;
  }

  getUserById(id) {
    return sql`SELECT id, full_name, email, role FROM users WHERE id=${id}`;
  }
}

module.exports = new UsersService();
