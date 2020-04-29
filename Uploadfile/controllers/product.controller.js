//const db = require("../db");
const Product = require("../models/product.model");

module.exports.index = async (req,res)=>{
	// //so luong 8 product
	// var countPage = Math.ceil(db.get("products").value().length / 8);
	// var page = parseInt(req.query.page) || 1;
	// var start = (page - 1) * 8;
	// var end = page * 8;


	// res.render('product/index',{ products : db.get("products").value().slice(start,end),countPage : countPage});

	var products  = await Product.find();
	res.render('product/index',{products : products});
};