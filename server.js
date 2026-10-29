const express = require('express');
const userDB = require('./models/userDB');

const app = express();
const PORT = 3000;

// ** Middleware **
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// ** Routes ***
app.get("/", function (req, res) {
    userDB.getUsers(function (data) {
        //console.log("using app.get");
        console.log(data);
        res.render("manageUsers", { users: data });
    });
});

app.post("/users", function (req, res) {
    userDB.addUser(req.body, function (data) {
        //console.log("logging req.body" + req.body);
        res.redirect("/"); //rendering happens in the root
    });
});

app.listen(PORT, function () {
    console.log(`Listening on Port: ${PORT}`);
});
