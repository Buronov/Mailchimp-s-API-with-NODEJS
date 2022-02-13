const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const fullName = req.body.fname;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.number;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fullName,
                    PPWP_PWD: password,
                    PHONE: phoneNumber
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://*.api.mailchimp.com/3.0/lists/*"

    const options = {
        method: "POST",
        auth: "jonik:*"
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.listen(3003, () => {
    console.log("Your Server Is Running On 3003 Port!!!")
})

// API KEY
// dd11e463d63a643d6fcbca38857d9bdc-us14

// LIST ID
// e9556c4180