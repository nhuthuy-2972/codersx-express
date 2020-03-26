const db = require("../db");


module.exports.add = (req,res)=>{
	
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId)
	{
		res.redirect('/product');
	}

	var count = db.get('sessions').find({session : sessionId})
	.get('cart.'+productId,0).value();

	db.get('sessions').find({session : sessionId}).set("cart." + productId, count + 1).write();

	res.redirect('/product');

};