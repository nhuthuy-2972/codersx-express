const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');
const cookieParser = require("cookie-parser");
const authRoute = require('./routes/auth.route');
const authMiddleware = require('./middleware/auth.middleware');


app.engine('pug',require('pug').__express);
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(cookieParser('fsafgsfasfagasgfsaf'));

app.get('/',(req,res)=>{
	res.render('index.pug');
});

app.use('/users',authMiddleware.checkcookie,userRoute);
app.use('/auth',authRoute);


app.listen(port,()=>{console.log('Server started...');});