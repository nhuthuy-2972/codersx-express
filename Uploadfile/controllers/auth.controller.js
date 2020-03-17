const md5 = require('md5');
const db = require("../db");


module.exports.loginPage = (req,res)=>{
	res.render('auth/login');
};


module.exports.checkAuth = (req,res)=>{
	var email = req.body.email;

	var user = db.get("users").find({email : email}).value();

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
	res.cookie('userId',user.id,{signed : true});
	res.redirect('/users');
};