<<<<<<< HEAD
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

    room: {
        type: String, required: true
    },
    roomid: {
        type: String, required: true
    },
    
    userid: {
        type: String, required: true
    },
    fromdate: {
        type: String, required: true
    },
    todate: {
        type: String, required: true
    },
    totalamount: {
        type: Number, required: true
    },
    totaldays: {
        type: Number, required: true
    },
    transactionId: {
        type: String, required: true
    },
    status: {
        type: String, required: true, default: 'booked'
    }
}, {
        timestamps: true,
})

const bookingmodel = mongoose.model('bookings', bookingSchema);


module.exports = bookingmodel
=======
const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    room : {
        type: String, require: true
    },
    roomid : {
        type: String, require: true
    },
    userid : {
        type: String, require: true
    },
    fromdate:{
        type: String, require: true
    },
    todate:{
        type: String, require: true
    },
    totalamount:{
        type: Number, require: true
    },
    totalday:{
        type: Number, require: true
    },
    transactionId:{
        type: String, require: true
    },
    status:{
        type: String, require: true, default : 'booked'
    }

    
},{
    timestamps: true,
})

const bookingmodel = mongoose.model('bookings' , bookingSchema);

module.exports = bookingmodel
>>>>>>> 8071a6671b1d32895373e2ebeff1809304b50048

