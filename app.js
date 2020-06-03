
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/" , function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res){
  const name = req.body.name ;
  const email = req.body.email ;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_field: {
          FNAME : name
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

   const url = "https://us10.api.mailchimp.com/3.0/lists/c9a2a5fcca"
   const options = {
     method: "POST",
     auth: "anyName:0a58b7d36d4213bc069956e2571ab873-us10"
   }

  const request = https.request(url , options, function(response){
    if (response.statusCode == 200){
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data" , function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();

});

app.post("/failure" , function(req , res){
  res.redirect("/");
});

// mailchimp key
// 0a58b7d36d4213bc069956e2571ab873-us10

app.listen(process.env.PORT || 3000 , function(){
  console.log("Server is running on port 3000");
});
