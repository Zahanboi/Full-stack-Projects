const cloudinary = require('cloudinary').v2
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const ExpressError = require('./ExpressError');
require('dotenv').config()
 // Configuration

    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'wanderlust',
        allowed_formats: ["png", "jpg", "jpeg"],
    },
})

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new ExpressError("Only .jpg and .png files are allowed."), false);
//   }
// };

// const upload = multer({ storage, fileFilter });


module.exports = {
    cloudinary,
    storage,
}