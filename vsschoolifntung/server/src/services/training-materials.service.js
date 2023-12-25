const sql = require("../sql");

class TrainingMaterialsService {
  save({ title, file, classId, lessonId }) {
    console.log(title, file, classId, lessonId);
    return sql`INSERT INTO educational_materials (title, file, lesson_id, class_id) VALUES (${title}, ${file}, ${lessonId}, ${classId})`;
  }

  delete({ id }) {
    return sql`DELETE FROM educational_materials where id=${id}`;
  }

  getAll() {
    return sql`SELECT * FROM educational_materials`;
  }

  getAllForClass({ classId, lessonId }) {
    return sql`SELECT * FROM educational_materials WHERE class_id=${classId} AND lesson_id=${lessonId}`;
  }
}

module.exports = new TrainingMaterialsService();
