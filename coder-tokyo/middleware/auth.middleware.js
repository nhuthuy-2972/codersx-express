const db = require("../db");

module.exports.checkcookie = (req,res,next)=>{
	var cookie = req.cookies;
	console.log(cookie);
	if(!cookie)
	{
		res.redirect('/auth/login');
		return;
	}

	var user = db.get("users").find({id : req.cookies.userId}).value();

	if(!user)
	{
		res.redirect('/auth/login');
		return;	
	}

	next();
};