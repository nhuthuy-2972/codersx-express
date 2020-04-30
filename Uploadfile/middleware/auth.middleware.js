//const db = require("../db");
const User = require('../models/user.model');
module.exports.checkcookie = async (req,res,next)=>
{
	var cookie = req.signedCookies;
	//console.log(cookie);
	if(!cookie.userId)
	{
		res.redirect('/auth/login');
		return;
	}

	//var user = db.get("users").find({id : cookie.userId}).value();
	var user = await User.find({_id:cookie.userId});
	if(!user)
	{
		res.redirect('/auth/login');
		return;	
	}
	res.locals.currentuser = user;
	next();
};