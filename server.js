const express = require("express");

const app = express();

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("You are here!!!")
})

app.listen(3003, () => {
    console.log("Your Server Is Running On 3003 Port!!!")
})