const express = require("express");

const app = express();

const dbConfig = require('./db')
const roomsRoute = require("./routes/roomsRoute")

app.use("/api/rooms",roomsRoute)

const port  = process.env.PORT || 3000;

app.listen(port, () => console.log(`Node server started using nodemon`)); 