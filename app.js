//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var firstName  = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }
            }    

        ]
          
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/e4437f24a8";

    const options = {
        method: "POST",
        auth: "alberto1:c53b8256bbcfbc7c8df3214ba17ccf41-us11"

    }

    var request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");;
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        

    //  https://us11.api.mailchimp.com/3.0/.
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is up and running on port 3000");
});

// apikey = c53b8256bbcfbc7c8df3214ba17ccf41-us11
// list id=725760# 
// List Id for audience = e4437f24a8