var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database -> enter you credentials here; username and password for mongodb 
mongoose.connect('mongodb+srv://<username>:<password>@learningmdb.z6yrj3s.mongodb.net/?retryWrites=true&w=majority');

// Below is a blueprint for mongodb to know what expect 
var todoSchema = new mongoose.Schema({
    item: String
});

// create a to do model 
var Todo = mongoose.model('Todo', todoSchema);


// data in an object 
// var data = [{item: 'Eat Food'}, {item: 'Read a Book'}, {item: 'Go Shopping'}, {item: 'start a twitch stream'}, {item: 'call mom'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    // Change the code below so that it will interact with the database
    // GET, POST, DELETE => WILL BE HERE
    
    app.get('/todo', function(req, res){
        // Get the data from Mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {data: data})
        });
    });

    // post an item
    app.post('/todo', urlencodedParser, function(req, res){
        // Get data from the view and add it to MongoDB
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data)
        }); 
    });

    app.delete('/todo/:item', function(req, res){
        // Delete the requested item from MongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err; 
            res.json(data)
        });
    });

}