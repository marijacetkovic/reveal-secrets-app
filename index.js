
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
var authorized = false;

app.use(bodyParser.urlencoded({extended:true}));

//root page
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})


//defining middleware for checking the password
function passwordCheck(req, res, next) {
    //retreiving the password from the html form
    const password = req.body.password;
    if (password === "lubenica67") {
      authorized = true;
    }
    next(); //continue the https pipeline
  }

//use the middleware by our express app
app.use(passwordCheck);

app.post("/check",(req,res)=>{
    if (authorized){
        res.sendFile(__dirname+"/public/secret.html");
    } 
    else{
        res.redirect("/");
    }
})


app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})