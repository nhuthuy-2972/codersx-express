const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/',userController.userlist);

router.get('/search',userController.search);

router.get('/create',userController.create);

router.get('/:id',userController.view);


router.post('/create',userController.postCreate);


module.exports = router;