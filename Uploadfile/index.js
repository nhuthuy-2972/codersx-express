require('dotenv').config()
console.log(process.env.SESSION_SECRECT);
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');
const cookieParser = require("cookie-parser");
const authRoute = require('./routes/auth.route');
const authMiddleware = require('./middleware/auth.middleware');
const productRoute = require('./routes/product.route');
const sessionMiddleware = require('./middleware/session.middleware');
const cartRoute = require('./routes/carts.route');

app.engine('pug',require('pug').__express);
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRECT));
app.use(sessionMiddleware);
app.get('/',(req,res)=>{
	res.render('index.pug');
});



app.use('/users',authMiddleware.checkcookie,userRoute);
app.use('/auth',authRoute);
app.use('/product',productRoute);
app.use('/cart',cartRoute);

app.listen(port,()=>{console.log('Server started...');});

// fafasffasf