const sql = require("../sql");

class TeacherService {
  getAll() {
    return sql`
      SELECT full_name, user_id, subject, t.id FROM teachers t
      LEFT JOIN users u ON t.user_id = u.id;
    `;
  }

  getByUserId(userId) {
    return sql`
      SELECT full_name, user_id, subject, t.id FROM teachers t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ${userId};
    `;
  }

  getLessonByTeacherId(teacherId) {
    return sql`SELECT * FROM lessons WHERE teacher_id=${teacherId}`;
  }
}

module.exports = new TeacherService();
