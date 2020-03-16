const db = require("../db");
const shortId = require('shortid');


module.exports.userlist = (req,res)=>{
	console.log(db.get("users").value);
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
	res.render('users/create');
};

module.exports.view = (req,res)=>{
	var id = req.params.id;
	var user = db.get("users").find({id:id}).value();

	res.render('users/viewuser',{user : user});
};

module.exports.postCreate = (req,res)=>{
	req.body.id = shortId.generate();
	var errors = [];
	if(!req.body.name)
	{
		errors.push('Name is required');
	}

	if(!req.body.phone)
	{
		errors.push('Phone is required');	
	}

	if(errors.length)
	{
		res.render("users/create",{errors:errors,values : req.body});
		return;
	}

	db.get("users").push(req.body).write();
	res.redirect('/users');
};