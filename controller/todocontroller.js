var bodyParser = require("body-parser");
var firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {
    // Add your firebase config here
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// data in an object
// var data = [{item: 'Eat Food'}, {item: 'Read a Book'}, {item: 'Go Shopping'}, {item: 'start a twitch stream'}, {item: 'call mom'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    // Change the code below so that it will interact with the database
    // GET, POST, DELETE => WILL BE HERE

    app.get("/todo", function(req, res) {
        // Get the data from Firebase and pass it to the view
        db.collection("todo")
            .get()
            .then((snapshot) => {
                var data = [];
                snapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                res.render("todo", { data: data });
            })
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    });

    // post an item
    app.post("/todo", urlencodedParser, function(req, res) {
        // Get data from the view and add it to Firebase
        db.collection("todo")
            .add(req.body)
            .then((ref) => {
                console.log("Added document with ID: ", ref.id);
                res.json({ id: ref.id });
            })
            .catch((err) => {
                console.log("Error getting documents", err);
            });
    });

    app.delete("/todo/:item", function(req, res) {
        // Delete the requested item from MongoDB
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(
            err,
            data
        ) {
            if (err) throw err;
            res.json(data);
        });
    });
};