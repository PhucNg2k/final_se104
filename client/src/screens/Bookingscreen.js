import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
function Bookingscreen(match) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const roomid = match.params.roomid
  const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
  const todate = moment(match.params.todate, 'DD-MM-YYYY')

  const totaldays = moment.duration(todate.diff(fromdate)).asDay()+1
  const totalamount = totaldays * room.rentperday
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: roomid })
        ).data;

        setRoom(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.room.name}</h1>
              <img src={room.room.imageurls[0]} alt="" className="smallimg" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: </p>
                  <p>From Date: </p>
                  <p>To Date: </p>
                  <p>Max Count: {room.room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : </p>
                  <p>Rent per day : {room.room.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
