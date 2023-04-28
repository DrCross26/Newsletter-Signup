const express = require("express");

const bodyParser = require("body-parser")
const request = require("request")
const https =require("https");
const { url } = require("inspector");
const { options } = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const  firstName = req.body.fName;
    const  lastName = req.body.lName;
    const  email = req.body.email;
    
    const data = {
        members:[

            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]

    };
    const jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/95418f675b";
    
    const options = {
        method: "POST",
        auth: "cross:52d274abca17e0f7882b88c9600097b7-us21"
    }

    const request = https.request(url, options, function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(bodyParser.jsonData);
});

app.listen(5500, function(){

    console.log("Server is running on port 5500");
})

// Apikey
// 52d274abca17e0f7882b88c9600097b7-us21

// list ID
// 95418f675b