const md5 = require('md5');
//const db = require("../db");
const User = require("../models/user.model");


module.exports.loginPage = (req,res)=>
{
	res.render('auth/login');
};


module.exports.checkAuth = async (req,res)=>{
	var email = req.body.email;

	//var user = db.get("users").find({email : email}).value();
	var user = await User.findOne({email:email});
	
	console.log(user);
	if(!user){
		res.render('auth/login',{
			errors :['User is not exits'],
			values : req.body
		})
		return;
	}
	
	var password = md5(req.body.password);

	if(password !== user.password)
	{
		res.render('auth/login',{
			errors :['Wrong password'],
			values : req.body
		})
		return;	
	} 
	res.cookie('userId',user._id,{signed : true});
	res.redirect('/users');
};