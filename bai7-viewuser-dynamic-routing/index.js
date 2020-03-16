const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortId = require('shortid');


const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({users : []}).write();

app.engine('pug',require('pug').__express);
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));



app.get('/',(req,res)=>{
	res.render('index.pug');
});

app.get('/users',(req,res)=>{
	console.log(db.get("users").value);
	res.render('users/userlist.pug',{users : db.get("users").value(), q :'Enter name'});
});

app.get('/users/search',(req,res)=>{
	var q = req.query.q;

	var matchedUsers = db.get("users").value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	console.log(matchedUsers);
	res.render('users/userlist',{users : matchedUsers, q : q});
});

app.get('/users/create',(req,res)=>{
	res.render('users/create');
});

app.post('/users/create',(req,res)=>{
	req.body.id = shortId.generate();
	db.get("users").push(req.body).write();
	res.redirect('/users');
});

app.get('/users/:id',(req,res)=>{
	var id = req.params.id;
	var user = db.get("users").find({id:id}).value();

	res.render('users/viewuser',{user : user});
});

app.listen(port,()=>{console.log('Server started...');});















