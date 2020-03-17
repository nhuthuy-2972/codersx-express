const db = require("../db");
const shortId = require('shortid');


module.exports.userlist = (req,res)=>{
	//console.log(db.get("users").value);
	res.render('users/userlist.pug',{users : db.get("users").value()});
};

module.exports.search = (req,res)=>{
	var q = req.query.q;
	var matchedUsers = db.get("users").value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	console.log(matchedUsers);
	res.render('users/userlist',{users : matchedUsers, q : q});
};

module.exports.create = (req,res)=>{
	console.log(req.cookies);
	res.render('users/create');
};

module.exports.view = (req,res)=>{
	var id = req.params.id;
	var user = db.get("users").find({id:id}).value();

	res.render('users/viewuser',{user : user});
};

module.exports.postCreate = (req,res)=>{
	req.body.id = shortId.generate();
	req.body.avatar = req.file.path.split('/').splice(1).join('/');
	db.get("users").push(req.body).write();
	res.redirect('/users');
};