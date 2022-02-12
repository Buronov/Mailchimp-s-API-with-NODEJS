const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const app = express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;

    console.log(firstName, lastName, email, password)
})

app.listen(3003, () => {
    console.log("Your Server Is Running On 3003 Port!!!")
})