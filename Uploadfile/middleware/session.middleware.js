//const db = require("../db");
const Session = require('../models/session.model');
const shortId = require('shortid');

module.exports =  function (req,res,next) {
	if(!req.signedCookies.sessionId)
	{
		console.log ("Session middleware");
		var sessionId = shortId.generate();
		res.cookie('sessionId',sessionId,{signed : true});
		//db.get("sessions").push({session : sessionId}).write();
		Session.collection.insertOne({session : sessionId,cart :{"5ea9c392336277a7404fc755":1,"5ea9c689385ab503944f49ca":2}},function(err,doc)
			{
				if(err)
				{
					console.log("err");
				}
				else
				{
					console.log("inserted");
				}
			});
	}	
	next();
}