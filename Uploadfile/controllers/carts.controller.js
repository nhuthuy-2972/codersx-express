//const db = require("../db");
const Session = require("../models/session.model");

module.exports.add =async (req,res)=>{
	
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId)
	{
		res.redirect('/product');
	}

	//var count = db.get('sessions').find({session : sessionId})
	//.get('cart.'+productId,0).value();

	//db.get('sessions').find({session : sessionId}).set("cart." + productId, count + 1).write();

	var _session = await Session.findOne({session:sessionId});
	
	var count = _session.cart[productId] || 0;
	console.log(count);

	_session.cart[productId] = ++count;
	console.log(_session);

	await Session.updateOne({session: sessionId},{cart : _session.cart},{upsert : false});

	res.redirect('/product');

};