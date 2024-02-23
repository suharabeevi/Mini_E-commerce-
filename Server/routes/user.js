const express = require("express");
const router = express.Router();
const usercontroller= require('../Controllers/usercontroller')
const upload =require('../multer')
router.post("/", usercontroller.usersignup);
router.post("/login",usercontroller.userlogin)
router.post('/prodcuts',upload,usercontroller.addproducts)

module.exports = router;
