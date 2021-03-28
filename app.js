//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(process.env.PORT || 3000,function () {
 console.log("Server is running at port 3000");
});

app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
// //Setting up MailChimp
app.post("/failure",function(req,res){
  res.redirect("/");
})
mailchimp.setConfig({
 apiKey: "enter_your_api_key",
 server: "_enter_server"
});

app.post("/", function (req,res) {
// console.log(req.body);
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const email = req.body.email;
  const listId = "enter list id";

// // //Uploading the data to the server
const run = async () => {

    const response = await mailchimp.lists.batchListMembers(listId, {

      members: [

        {

          email_address: email,

          status: "subscribed",

          merge_fields: {

            FNAME: firstName,

            LNAME: secondName

          }

        }

      ],

    });
    res.sendFile(__dirname + "/success.html")
    console.log(
   `Successfully added contact as an audience member. The contact's id is ${
    response.id
    }.`
   );

  };

 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
