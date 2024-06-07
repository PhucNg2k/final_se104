const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    roomid: {
      type: String,
      required: true,
    },

    userid: {
      type: String,
      required: true,
    },
    fromdate: {
      type: String,
      required: true,
    },
    todate: {
      type: String,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    totaldays: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
    localPax: {
      type: Number,
      required: true,
      min: [0, 'foreignPax phải là số lớn hơn hoặc bằng 0'] 
    },
    foreignPax: {
      type: Number,
      required: true,
      min: [0, 'foreignPax phải là số lớn hơn hoặc bằng 0'] 
    },
    totalPax: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const bookingmodel = mongoose.model("bookings", bookingSchema);

module.exports = bookingmodel;
