const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth.controller');
const loginValidate = require('../validate/login.validate');

router.get("/login", authController.loginPage);


router.post("/login",loginValidate.postLogin,authController.checkAuth);

module.exports = router;