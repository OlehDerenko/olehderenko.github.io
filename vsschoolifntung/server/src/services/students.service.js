const sql = require("../sql");

class StudentService {
  async getStudentById(id) {
    return sql`SELECT * FROM students WHERE user_id=${id}`;
  }

  getLessonsForClass({ classId }) {
    return sql`SELECT DISTINCT name, lesson_id FROM schedule
    LEFT JOIN lessons ON schedule.lesson_id = lessons.id
    WHERE class_id = ${classId} ;`;
  }
}

const studentService = new StudentService();

module.exports = studentService;
