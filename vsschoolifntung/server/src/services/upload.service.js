const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = req.body.title;

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").at(-1);
    const filename = fileName + "-" + uniqueSuffix + "." + extension;
    console.log(filename);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const uploadService = {
  upload,
};

module.exports = uploadService;
