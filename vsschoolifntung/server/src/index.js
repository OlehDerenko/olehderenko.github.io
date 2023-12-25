const PORT = 3001;

const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");

const authMiddleware = require("./middlewares/auth.middleware");
const usersService = require("./services/users.service");
const uploadService = require("./services/upload.service");
const scheduleService = require("./services/schedule.service");
const studentSerice = require("./services/students.service");
const libraryService = require("./services/library.service");
const trainingMaterialsService = require("./services/training-materials.service");
const teacherService = require("./services/teacher.service");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/sign-in", async (req, res) => {
  const [user] = await usersService.getUserByEmail(req.body.email);

  if (user) {
    const isPasswordSame = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordSame) {
      res.status(401).json({ message: "Incorrect credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.full_name,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: "Incorrect credentials" });
  }
});

app.post("/sign-out", async (req, res) => {});

app.get("/me", authMiddleware, async (req, res) => {
  const user = req.user;

  if (user) {
    if (user.role === "teacher") {
      const [teacher] = await teacherService.getByUserId(user.id);

      const [lesson] = await teacherService.getLessonByTeacherId(teacher.id);

      res.json({
        ...user,
        metadata: {
          teacher,
          lesson,
        },
      });
      return;
    }

    if (user.role === "student") {
      const [student] = await studentSerice.getStudentById(user.id);
      console.log(student);
      const lessons = await studentSerice.getLessonsForClass({
        classId: student.class_id,
      });

      res.json({
        ...user,
        metadata: {
          student,
          lessons,
        },
      });
      return;
    }

    if (user.role === "admin") {
      res.json(user);
      return;
    }
  } else {
    res.status(401).json({ error: "Unautorized" });
  }
});

app.get("/classes", authMiddleware, async (req, res) => {
  const classes = await usersService.getClasses();

  res.json(classes);
});

app.get("/admin/teachers", authMiddleware, async (req, res) => {
  const teachers = await teacherService.getAll();

  res.json(teachers);
});

app.get("/admin/teachers/:id", authMiddleware, async (req, res) => {
  const [teacher] = await teacherService.getByUserId(req.params.id);

  console.log(teacher);

  const [lesson] = await teacherService.getLessonByTeacherId(teacher.id);

  console.log(lesson);

  const lessons = await scheduleService.getScheduleForLesson(lesson.id);

  res.json({
    teacher,
    lessons,
  });
});

app.get("/schedule/teacher/:className", authMiddleware, async (req, res) => {
  const user = req.user;
  const className = req.params.className;

  const [classData] = await scheduleService.getScheduleForClassName(className);

  console.log(classData);

  const schedule = await scheduleService.getScheduleForClassId(classData.id);

  console.log(schedule);

  res.json({ schedule });
});

app.get("/schedule/student", authMiddleware, async (req, res) => {
  const user = req.user;

  const [student] = await studentSerice.getStudentById(user.id);
  const schedule = await scheduleService.getScheduleForClassId(
    student.class_id
  );

  res.json({ schedule });
});

app.post(
  "/library/upload",
  authMiddleware,
  uploadService.upload.single("file"),
  async (req, res) => {
    if (req.user.role === "teacher") {
      const title = req.body.title;
      const file = req.file.path;

      await libraryService.saveBook({ title, file });

      res.json({
        path: req.file.path,
        success: true,
      });
    }
  }
);

app.post("/library/delete", authMiddleware, async (req, res) => {
  if (req.user.role === "teacher") {
    await libraryService.deleteBook({ id: req.body.book_id });
    const root = require("path").resolve("./");
    const file = req.body.file;

    fs.unlinkSync(`${root}/${file}`);

    res.json({
      success: true,
    });
  }
});

app.get("/library", authMiddleware, async (req, res) => {
  const books = await libraryService.getAllBooks();
  res.json(books);
});

app.post(
  "/training-materials/upload",
  authMiddleware,
  uploadService.upload.single("file"),
  async (req, res) => {
    if (req.user.role === "teacher") {
      const title = req.body.title;
      const file = req.file.path;
      const lessonId = req.body.lessonId;
      const classId = req.body.classId;

      await trainingMaterialsService.save({
        title,
        file,
        classId,
        lessonId,
      });

      res.json({
        path: req.file.path,
        success: true,
        lessonId,
        classId,
      });
    }
  }
);

app.post("/training-materials/delete", authMiddleware, async (req, res) => {
  if (req.user.role === "teacher") {
    await trainingMaterialsService.delete({ id: req.body.id });
    const root = require("path").resolve("./");
    const file = req.body.file;

    try {
      fs.unlinkSync(`${root}/${file}`);
    } catch (e) {
      console.log("file is not exist");
    }

    res.json({
      success: true,
    });
  }
});

app.get(
  "/training-materials/:classId/:lessonId",
  authMiddleware,
  async (req, res) => {
    const classId = req.params.classId;
    const lessonId = req.params.lessonId;
    const trainingMaterials = await trainingMaterialsService.getAllForClass({
      classId,
      lessonId,
    });

    res.json(trainingMaterials);
  }
);

app.get("/static/uploads/:fileName", function (req, res) {
  const root = require("path").resolve("./");
  const file = `${root}/static/uploads/${req.params.fileName}`;
  res.download(file);
});

app.listen(PORT, () => {
  console.log(`server is now listening on port http://localhost:${PORT}`);
});
