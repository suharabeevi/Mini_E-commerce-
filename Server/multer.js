const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// upload
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Mini-Ecommerce',
        allowedFormats: ['jpg', 'jpeg', 'png','webp'],
        public_id: (req, file) => {
            // remove the file extension from the file name
            const fileName = file.originalname.split('.').slice(0, -1).join('.');
            return fileName+new Date();
        },
    },
});
const upload = multer({ storage: storage }).single('productimage');
// console.log(upload,"upload");
module.exports = upload;
