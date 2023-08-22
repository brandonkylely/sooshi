// dependencies needed for S3 storage of images
const multer = require("multer");

// creating the storage variable to upload the file and providing the destination folder,
// if nothing is provided in the callback it will get uploaded in main directory
exports.storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});

// below variable is define to check the type of file which is uploaded
exports.fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// defining the upload variable for the configuration of photo being uploaded
exports.upload = multer({ storage: this.storage, fileFilter: this.fileFilter });