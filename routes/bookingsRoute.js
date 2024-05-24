const express = require('express')
const router = express.Router();
const Booking = require("../models/booking")

const Room = require('../models/room')
const moment = require('moment')

router.post("/bookroom", async (req, res) => {
    
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        foreignPax,
        localPax,
        totalPax
    } = req.body
    
    try {
        
        
        const newbooking = new Booking({
            room: room.room.name,
            roomid: room.room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: '1234',
            foreignPax,
            localPax,
            totalPax
        })

        const booking = await newbooking.save()
        const roomtemp = await Room.findOne({_id: room.room._id})

        roomtemp.currentbookings.push({
                                        bookingid: booking._id,
                                        fromdate: fromdate,
                                        todate: todate,
                                        userid: userid,
                                        status : booking.status,
                                        foreignPax: booking.foreignPax,
                                        localPax: booking.localPax,
                                        totalPax: booking.totalPax
                                    });
        await roomtemp.save()
                                    
        res.send('Room booked successfully 1')

    } catch (error) {
        return res.status(400).json({error});
    }
});



router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid

    try {
        const bookings = await  Booking.find({ userid: userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post( "/cancelbooking",async (req, res) => {
    const {bookingid, roomid} = req.body

    try {
        const bookingitem = await Booking.findOne( {_id: bookingid})

        bookingitem.status = 'cancelled'
        await bookingitem.save()
        const room  = await Room.findOne({_id: roomid})

        const bookings = room.currentbookings
        const temp = bookings.filter( booking => booking.bookingid.toString() !== bookingid)
        room.currentbookings = temp
        await room.save()

        res.send( 'Your booking cancelled succesfully')
    } catch (error) {
        return res.status(400).json({error});
    }

})


router.get('/getallbookings', async (req, res) => {
    try {
        const bookings = await Booking.find()

        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error})
    }
})



module.exports = router