import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />

          <h1> Name : {user.name} </h1>
          <h1> Email : {user.email} </h1>
          <h1> isAdmin: {user.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/bookings/getbookingsbyuserid", { userid: user._id })
        ).data;
        console.log(data);
        setbookings(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
        setError(error)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
            {loading && (<Loader />)}
            {bookings && (bookings.map(booking =>{
                return <div className="bs">
                  <h1>{booking.room}</h1>  
                  <p><b>BookingId</b>: {booking._id}</p>
                  <p><b>CheckIn</b>: {booking.fromdate}</p>
                  <p><b>Check Out</b>: {booking.todate}</p>
                  <p><b>Amount</b>: {booking.totalamount}</p>
                  <p><b>Status</b> : {booking.status === 'booked' ? 'CONFIRMED' : "CANCELLED"}</p>



                <div className="text-right">
                    <button class="btn btn-primary">CANCEL BOOKING</button>
                </div>

                </div>
            }))}

        </div>

      </div>
    </div>
  );
}
