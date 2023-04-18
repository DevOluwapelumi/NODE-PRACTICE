const { req, res } = require('express')
const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const URI = "mongodb+srv://pelumi:pelumi123@cluster0.qiildcr.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(URI)
    .then(() => {
        console.log("Database connected");  
    })
    .catch((err) => {
        console.log("Database Disconnected");  
        console.log(err)
    })

    
let userSchema = {
    firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password:{ type: String, required: true},
}
    let userModel = mongoose.model('user_name', userSchema)

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    console.log("Request made");
    res.render("land")
})

app.get("/signUp", (req, res) => {
    console.log("SignUp accessed")
    res.render("signUp", {message:""})
})
app.post("/signUp",async (req,res) => {
    console.log(req.body)
    let form = await userModel.create(req.body)
    form.save()
     .then(()=> {
         console.log("Successfully saved")
         res.redirect("signIn")
     })
        .catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                console.log(err.code);
                res.render("signUp", { message:"Email Already Exit"})
            } 
    })
})

app.get("/signIn", (req, res) => {
    console.log("Sign_in accessed")
    res.render("signIn", {message:""})
})
app.post("/signIn", async (req, res) => {
    userModel.find({ email: req.body.email, password: req.body.password })
        .then((response) => {
            if (response.length > 0) {
                res.redirect("board")
            } else {
                res.render("signIn", { message: "Incorrect email or password"})
        }
        })
        .catch((err) => {
        console.log(err)
    })
})

app.get("/board", (req, res) => {
    userModel.find()
        .then((response) => {
            console.log(response);
            console.log("Dash_board accessed")
            res.render("board", {response})
        })
        .catch((err) => {
        console.log(err)
    })
})
    
app.post("/delete")


   










app.listen("4555", () => {
    console.log("Server don start on port 4555");
})