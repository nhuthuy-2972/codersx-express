const express = require('express');
const app = express();
const port = 3000;

var users = [{id : 1, name : "Huy"},{id : 2, name : "Bao"},{id : 3, name : "Mong"}];

app.engine('pug',require('pug').__express);
app.set('view engine','pug');
app.set('views','./views');

app.get('/',(req,res)=>{
	res.render('index.pug');
});

app.get('/users',(req,res)=>{
	res.render('users/userlist.pug',{users : users, q :'Enter name'});
});

app.get('/users/search',(req,res)=>{
	var q = req.query.q;

	var matchedUsers = users.filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	console.log(matchedUsers);
	res.render('users/userlist',{users : matchedUsers, q : q});
});

app.listen(port,()=>{console.log('Server started...');});