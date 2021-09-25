const multer = require("multer");
const path = require("path");
const responseStandard = require("../helpers/response");

module.exports = (field) => {
  return (req, res, next) => {
    // storage
    const maxSize = process.env.MAX_FILE_SIZE * 1000 * 1024;
    const storage = multer.diskStorage({
      destination: (req, _file, cb) => {
        cb(null, "./Assets/Public/Uploads");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          req.user.id +
            "-" +
            file.fieldname +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
      },
    });

    // function check File Type
    function checkFileType(file, cb) {
      const filetypes = /jpeg|jpg|png/i;
      const extname = filetypes.test(path.extname(file.originalname));
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        req.fileValidationError = "only jpg, jpeg or png files are allowed!";
        return cb(new Error(req.fileValidationError), false);
      }
    }

    // initial upload
    const upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
      },
      limits: { fileSize: maxSize },
    }).single(field);

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandard(res, err.message, {}, 500, false);
      } else if (req.fileValidationError) {
        return responseStandard(res, req.fileValidationError, {}, 400, false);
      } else if (err) {
        return responseStandard(res, err.message, {}, 500, false);
      } else {
        return next();
      }
    });
  };
};
