const express = require('express');
const app = express();
const port = 3000;

app.get('/',(resquest,respone)=>{
	respone.send('<h1>Phan Lam Nhut Huy</h1>');
});


app.listen(port,()=>{console.log('Server listening on port ' + port);});
