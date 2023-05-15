const multer = require('multer');

//books cover storage

const bookCoverStorage = multer.diskStorage({
  destination: 'uploads/bookCover',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

//user profile storage
const userProfileStorage = multer.diskStorage({
  destination: 'uploads/userProfile',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadCover = multer({ storage: bookCoverStorage });
const uploadProfile = multer({ storage: userProfileStorage });

// exports
module.exports = { uploadCover, uploadProfile };
