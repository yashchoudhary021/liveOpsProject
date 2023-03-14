const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const userRoutes = require('./routes/user.js')
const offerRoutes = require("./routes/offer.js")

mongoose.connect("mongodb://127.0.0.1:27017/assignment-3")
    .then(() => {
        console.log("Mongodb Connected successfully")
    }).catch((error) => [
        console.log(error.messgage)
    ])

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("App is working on", PORT)
})
app.use("/user", userRoutes);
app.use("/offer", offerRoutes)