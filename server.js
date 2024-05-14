const express = require("express");

const app = express();

const dbConfig = require('./db')
const roomsRoute = require("./routes/roomsRoute")


const bookingRoute = require('./routes/bookingsRoute')
app.use(express.json())

app.use("/api/rooms", roomsRoute)
app.use("/api/booking", bookingRoute)
const port  = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node server port ${port} started using nodemon`)); 