const db = require("../db");

module.exports.checkcookie = (req,res,next)=>{
	var cookie = req.signedCookies;
	console.log(cookie);
	if(!cookie.userId)
	{
		res.redirect('/auth/login');
		return;
	}

	var user = db.get("users").find({id : cookie.userId}).value();

	if(!user)
	{
		res.redirect('/auth/login');
		return;	
	}
	res.locals.currentuser = user;
	next();
};