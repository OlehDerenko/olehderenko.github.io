const sql = require("../sql");

class ScheduleService {
  getScheduleForClassName(className) {
    return sql`SELECT id, name FROM classes WHERE name=${className}`;
  }

  getScheduleForClassId(id) {
    return sql`
        SELECT schedule.id, schedule.day, schedule.time, lessons.name
        FROM schedule
        LEFT JOIN lessons ON schedule.lesson_id = lessons.id
        WHERE schedule.class_id = ${id}
        ORDER BY
            CASE
                WHEN schedule.day = 'Понеділок' THEN 1
                WHEN schedule.day = 'Вівторок' THEN 2
                WHEN schedule.day = 'Середа' THEN 3
                WHEN schedule.day = 'Четвер' THEN 4
                WHEN schedule.day = 'Пятниця' THEN 5
                ELSE 6 -- Решта днів, якщо є
            END;
    `;
  }

  getScheduleForLesson(lessonId) {
    return sql`SELECT * FROM schedule WHERE lesson_id=${lessonId}`;
  }
}

module.exports = new ScheduleService();
