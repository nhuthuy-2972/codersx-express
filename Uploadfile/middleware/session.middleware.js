const db = require("../db");
const shortId = require('shortid');

module.exports = function (req,res,next) {
	if(!req.signedCookies.sessionId)
	{
		var sessionId = shortId.generate();
		res.cookie('sessionId',sessionId,{signed : true});
		db.get("sessions").push({session : sessionId}).write();
	}	
	next();
}