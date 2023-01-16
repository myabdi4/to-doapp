var express = require('express');
var todoController = require('./controller/todocontroller');
var port = process.env.port || 8080

const app = express();

// set ejs 
app.set('view engine', 'ejs')

// use middleware to access static files in the public folder 
app.use(express.static('./public'))


// todocontroller app 
todoController(app);



// listen port
app.listen(port, () => {
    console.log(`Now listening to port ${port}`)
});