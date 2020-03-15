const express = require('express');
const app = express();
const port = 3000;

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/',(req,res)=>{
	res.render('index.pug',{ name : "huy"});
});

app.get('/users',(req,res)=>{
	res.render('users/index', {users : ['huy','mong']});
});

app.listen(port,()=>{console.log('Server listening on port ' + port);});
