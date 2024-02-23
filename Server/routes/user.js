const express = require("express");
const router = express.Router();
const usercontroller= require('../Controllers/usercontroller')

router.post("/", usercontroller.usersignup);
router.post("/login",usercontroller.userlogin)

module.exports = router;
