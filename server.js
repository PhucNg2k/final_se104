const express = require("express");

const app = express();

const dbConfig = require('./db')
const roomsRoute = require("./routes/roomsRoute")

app.use(express.json())

app.use("/api/rooms", roomsRoute)

const port  = process.env.PORT || 3000;

app.listen(port, () => console.log(`Node server port ${port} started using nodemon`)); 