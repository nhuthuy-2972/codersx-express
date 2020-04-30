//const db = require("../db");
const User = require('../models/user.model');
//const shortId = require('shortid');

module.exports.userlist =async (req,res)=>{
	//console.log(db.get("users").value);
	//res.render('users/userlist.pug',{users : db.get("users").value()});
	res.render('users/userlist.pug',{users :await User.find()});
};

module.exports.search = async (req,res)=>{
	var q = req.query.q;
	var _users = await User.find();
	var matchedUsers = _users.filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	console.log(matchedUsers);
	res.render('users/userlist',{users : matchedUsers, q : q});
};

module.exports.create = (req,res)=>{
	console.log(req.cookies);
	res.render('users/create');
};

module.exports.view = async (req,res)=>{
	var id = req.params.id;
	//var user = db.get("users").find({id:id}).value();
	var user = await User.findOne({_id : id});
	res.render('users/viewuser',{user : user});
};

module.exports.postCreate = async(req,res)=>{
	//req.body.id = shortId.generate();
	req.body.avatar = req.file.path.split('/').splice(1).join('/');
	//db.get("users").push(req.body).write();
	await User.collection.insertOne(req.body);

	res.redirect('/users');
};