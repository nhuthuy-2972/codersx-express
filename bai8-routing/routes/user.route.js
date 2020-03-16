var express = require('express')
const db = require("../db");
const shortId = require('shortid');

var router = express.Router();

router.get('/',(req,res)=>{
	console.log(db.get("users").value);
	res.render('users/userlist.pug',{users : db.get("users").value(), q :'Enter name'});
});

router.get('/search',(req,res)=>{
	var q = req.query.q;

	var matchedUsers = db.get("users").value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	console.log(matchedUsers);
	res.render('users/userlist',{users : matchedUsers, q : q});
});

router.get('/create',(req,res)=>{
	res.render('users/create');
});

router.get('/:id',(req,res)=>{
	var id = req.params.id;
	var user = db.get("users").find({id:id}).value();

	res.render('users/viewuser',{user : user});
});


router.post('/create',(req,res)=>{
	req.body.id = shortId.generate();
	db.get("users").push(req.body).write();
	res.redirect('/users');
});


module.exports = router;