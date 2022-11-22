const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
   
    })

app.post("/", function(req, res){

    const apiKey = "91f31cd80e206107ba315bb094c2bc1d";
    query = req.body.cityName;
    unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey +"&units=" + unit ;
    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temperature in " + query  + " is "+ temp + " Degree Fehrnhit </h1>");
            res.write("<p>The weather is currently  " + description +"</p>");
            res.write("<img src=" + imageURL +">");
            res.send();
         })
        })
})

    


        app.listen(3000, function(){
        console.log("Server is running on port 3000");
            });
