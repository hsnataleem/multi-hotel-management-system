const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "src/uploads/hotels");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },

});

// File filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|webp/;

    const isValidExtension = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const isValidMime = allowedTypes.test(file.mimetype);

    if (isValidExtension && isValidMime) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."));
    }

};

// Upload middleware
const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },

});

module.exports = upload;