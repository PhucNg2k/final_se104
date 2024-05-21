const express = require("express");

const app = express();

const dbConfig = require('./db')
const roomsRoute = require("./routes/roomsRoute")
const userRoute = require("./routes/userRoute")
const bookingRoute = require("./routes/bookingsRoute")

app.use(express.json())

app.use("/api/rooms", roomsRoute)
app.use("/api/users", userRoute )
app.use("/api/bookings", bookingRoute )

const port  = process.env.PORT || 4000;

app.listen(port, () => console.log(`Node server port ${port} started using nodemon`)); 