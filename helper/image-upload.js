const multer = require('multer')
const fs = require('fs');
const dir_path =  'uploads';

// check if directory exists
if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFilter})

module.exports = upload;
