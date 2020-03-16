const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');
const validateUser = require('../validate/user.validate');

router.get('/',userController.userlist);

router.get('/search',userController.search);

router.get('/create',userController.create);

router.get('/:id',userController.view);


router.post('/create',validateUser.postCreate ,userController.postCreate);




module.exports = router;