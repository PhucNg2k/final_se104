// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Loader from "../components/Loader";
// import Error from "../components/Error";
// import moment from "moment";
// import StripeCheckout from 'react-stripe-checkout'
// function Bookingscreen(match) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState();
//   const [room, setRoom] = useState();

//   let { roomid, fromdate, todate } = useParams();
//   const firstdate = moment(fromdate, "DD-MM-YYYY");
//   const lastdate = moment(todate, "DD-MM-YYYY");

//   const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;

//   const [totalamount, settotalamount] = useState();
//   useEffect(() => {
//     const fetchData = async () => {

//       if( !localStorage.getItem('currentUser')){
//         window.location.reload='/login'
//       }


//       try {
//         setLoading(true);
//         const data = (
//           await axios.post("/api/rooms/getroombyid", { roomid: roomid })
//         ).data;

//         setRoom(data);
//         settotalamount(room ?  room.room.rentperday * totaldays : 0)  
        
        
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   async function bookRoom() {
//     const bookingDetails = {
//       room,
//       userid: JSON.parse(localStorage.getItem("currentUser"))._id,
//       fromdate,
//       todate,
//       totalamount,
//       totaldays,
//     };

    

//     try {
//       const result = await axios.post("/api/bookings/bookroom", bookingDetails);
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   function onToken(token){
//     console.log(token)

//   }


//   return (
//     <div className="m-5">
//       {loading ? (
//         <Loader />
//       ) : room ? (
//         <div>
//           <div className="row justify-content-center mt-5 bs">
//             <div className="col-md-6">
//               <h1>{room.room.name}</h1>
//               <img src={room.room.imageurls[0]} alt="" className="smallimg" />
//             </div>

//             <div className="col-md-6">
//               <div style={{ textAlign: "right" }}>
//                 <h1>Booking Details</h1>
//                 <hr />
//                 <b>
//                   <p>
//                     Name: {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
//                   </p>
//                   <p>From Date: {fromdate} </p>
//                   <p>To Date: {todate} </p>
//                   <p>Max Count: {room.room.maxcount}</p>
//                 </b>
//               </div>

//               <div style={{ textAlign: "right" }}>
//                 <b>
//                   <h1>Amount</h1>
//                   <hr />
//                   <p>Total days : {totaldays}</p>
//                   <p>Rent per day : {room.room.rentperday}</p>
//                   <p>Total Amount : {room.room.rentperday*totaldays}</p>
//                 </b>
//               </div>

//               <div style={{ float: "right" }}>
//                 <button className="btn btn-primary" onClick={bookRoom}> Pay Now </button>

//                 <StripeCheckout
//                     token={onToken}
//                     stripeKey=""
//                 />

//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Error />
//       )}
//     </div>
//   );
// }

// export default Bookingscreen;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';





function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  
  const [foreignPax, setForeignPax] = useState(0);
  const handleForeignPaxChange = (e) => {
    const value = Math.max(0, Math.min(room.room.maxcount,parseInt(e.target.value))); 
    setForeignPax(value);
    if (value + localPax <= room.room.maxcount) {
      setForeignPax(value);
    } else {
      setForeignPax(room.room.maxcount - localPax);
    }
  };
  const [localPax, setLocalPax] = useState(0);
  const handleLocalPaxChange = (e) => {
    const value = Math.max(0, Math.min(room.room.maxcount,parseInt(e.target.value))); 
    setLocalPax(value);
    if (value + foreignPax <= room.room.maxcount) {
      setLocalPax(value);
    } else {
      setLocalPax(room.room.maxcount - foreignPax);
    }
  };
  const [totalPax, setTotalPax] = useState(0);

  let { roomid, fromdate, todate } = useParams();
  const firstdate = moment(fromdate, "DD-MM-YYYY");
  const lastdate = moment(todate, "DD-MM-YYYY");
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalamount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login';
      }

      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid })).data;
        setRoom(data);
        calculateTotalAmount(data.room.rentperday, totaldays);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid, totaldays]);

  useEffect(() => {
    setTotalPax(parseInt(foreignPax) + parseInt(localPax));
    if (room) {
      calculateTotalAmount(room.room.rentperday, totaldays);
    }
  }, );

  const calculateTotalAmount = (rentPerDay, totalDays) => {
    let totalamount = rentPerDay * totalDays;

    if (foreignPax > 0) {
      totalamount *= 1.5; // Multiply by 1.5 if there are any foreign guests
    }

    if (totalPax > 2) {
      totalamount *= room.room.surcharge; // Increase by 25% for each person beyond the first two
    }

    setTotalAmount(totalamount);
  };

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      foreignPax,
      localPax,
      totalPax
    };

    try {
      await axios.post("/api/bookings/bookroom", bookingDetails);
      navigate('/home'); // Navigate to the home page upon successful booking
    } catch (error) {
      console.log(error);
    }
  }

  function onToken(token) {
    console.log(token);
    // Assuming the payment was successful and calling bookRoom to finalize the booking
    bookRoom();
  }

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
                  <p>Name: {JSON.parse(localStorage.getItem("currentUser")).name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Pax Details</h1>
                  <hr />
                  <p>
                    Foreign Pax: 
                    <input
                      type="number"
                      value={foreignPax}
                      onChange={handleForeignPaxChange}
                      style={{ marginLeft: "10px" }}
                    />
                  </p>
                  <p>
                    Local Pax: 
                    <input
                      type="number"
                      value={localPax}
                      onChange={handleLocalPaxChange}  
                      style={{ marginLeft: "10px" }}
                    />
                  </p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Pax: {totalPax}</p>
                  <p>Total days: {totaldays}</p>
                  <p>Rent per day: {room.room.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button 
                  className="btn btn-primary" 
                  onClick={bookRoom}
                  disabled={totalPax > room.room.maxcount}
                >
                  Pay Now
                </button>

                {totalPax > room.room.maxcount && (
                  <p style={{ color: 'red' }}>Total pax exceeds the maximum count!</p>
                )}

                <StripeCheckout
                  token={onToken}
                  stripeKey=""
                />
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
