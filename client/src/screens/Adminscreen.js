import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'



const { TabPane } = Tabs;
function Adminscreen() {

  useEffect(() => { 
    if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
      window.location.href='/home'
    }
  })

  //console.log(JSON.parse(localStorage.getItem("currentUser")).isAdmin)
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
        <TabPane tab="Report" key="5">
          <Report />
        </TabPane>
        <TabPane tab="Payment" key="6">
          <Payment />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;



// Bookings list component
export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get("api/bookings/getallbookings");
        const bookingsData = bookingsResponse.data;

        const validUser = bookingsData.filter(booking => booking.userid);
        const usersData = {};

        await Promise.all( bookingsData.map(async (booking) => {
          try {
            const userid = booking.userid;
            const userResponse = await axios.get(`/api/users/getuser/${userid}`);
            usersData[userid] = userResponse.data;
          } catch (userError) {
            console.error(`Error fetching user with ID ${booking.userid}:`, userError);
          }
        }));

        


        setBookings(bookingsData); // Set only valid bookings
        setUsers(usersData);

        

        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();

    console.log(bookings)
    console.log(users)
    
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>Name</th>
              <th>Identity number</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Foreign Pax</th>
              <th>Local Pax</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const user = users[booking.userid] || {};
              return (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.cmnd || 'N/A'}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                  <td>{booking.foreignPax}</td>
                  <td>{booking.localPax}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {bookings.length > 0 && <h1>There are total {bookings.length} bookings</h1>}
      </div>
    </div>
  );
}


//Room list component
export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        const data = response.data;
        setRooms(data.rooms);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (roomId) => {
    navigate(`/rooms/${roomId}/edit`);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per day</th>
              <th>Max count</th>
              <th>Phone Number</th>
              <th>Surcharge</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr key={room._id} onClick={() => handleRowClick(room._id)} style={{ cursor: "pointer" }}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phoneNumber}</td>
                    <td>{room.surcharge}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {rooms.length && <h1>There are total {rooms.length} rooms</h1>}
      </div>
    </div>
  );
}



//User list component
export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/getallusers");
        const data = response.data;
        setUsers(data);
        
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
        
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">

      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



// Add room component


export function Addroom(){

  const [name, setname] = useState('')
  const [rentperday, setrentperday] = useState()
  const [maxcount, setmaxcount] = useState()
  const [description, setdescription] = useState()
  const [phoneNumber, setPhonenumber] = useState()
  const [type, settype] = useState()
  const [surcharge, setsurcharge] = useState()
  const [imageurl1, setimageurl1] = useState()
  const [imageurl2, setimageurl2] = useState()
  const [imageurl3, setimageurl3] = useState()
  const [loading, setLoading] = useState(false)

  async function addRoom() {
    const newroom = {
      name, rentperday, maxcount, description, phoneNumber, type, surcharge,
      imageurls: [imageurl1, imageurl2, imageurl3] 
    }

    try {
      setLoading(true)
      const result = await (await axios.post('/api/rooms/addroom', newroom)).data
      console.log(result)
      setLoading(false)
      Swal.fire('Congrats', 'Your new room added successfully', 'success').then( result => {
        window.location.href = '/home'
      })


    } catch (error) {
      console.log(error)
      Swal.fire('Oops', 'Something went wrong', 'error')
      setLoading(false)
    }

    console.log(newroom)
  }

  return (
    <div className="row">
      {loading && <Loader/>}
      <div className="col-md-5">
        {loading && <Loader/>}
        <input type="text" className="form-control" placeholder="room name"
        value={name} onChange={(e) => {setname(e.target.value)}} />
        <input type="text" className="form-control" placeholder="rent per day"
        value={rentperday} onChange={(e) => {setrentperday(e.target.value)}} />
        <input type="text" className="form-control" placeholder="max count" 
        value={maxcount} onChange={(e) => {setmaxcount(e.target.value)}}/>
        <input type="text" className="form-control" placeholder="description"
        value={description} onChange={(e) => {setdescription(e.target.value)}} />
        <input type="text" className="form-control" placeholder="phone number"
        value={phoneNumber} onChange={(e) => {setPhonenumber(e.target.value)}} />
        <input type="text" className="form-control" placeholder="surcharge"
        value={surcharge} onChange={(e) => {setsurcharge(e.target.value)}} />

      </div>
      <div className="col-md-5">
        <input type="text" className="form-control" placeholder="type"
        value={type} onChange={(e) => {settype(e.target.value)}} />
        <input type="text" className="form-control" placeholder="image URL 1"
        value={imageurl1} onChange={(e) => {setimageurl1(e.target.value)}}/>
        <input type="text" className="form-control" placeholder="image URL 2" 
        value={imageurl2} onChange={(e) => {setimageurl2(e.target.value)}}/>
        <input type="text" className="form-control" placeholder="image URL 3" 
        value={imageurl3} onChange={(e) => {setimageurl3(e.target.value)}}/>

        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addRoom}>Add room</button>
        </div>
      
      
      </div>



    </div>
  )
}




export function Report() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get("/api/bookings/getallbookings");
        const bookings = bookingsResponse.data;

        const roomDataPromises = bookings.map(booking => 
          axios.post('/api/rooms/getroombyid', { roomid: booking.roomid })
        );
        const roomDataResponses = await Promise.all(roomDataPromises);

        const bookingsWithRoomData = bookings.map((booking, index) => {
          const room = roomDataResponses[index].data.room;
          const fromdate = booking.fromdate;
          let month;

          try {
            console.log(fromdate.split('-')[2])
            const date = new Date(fromdate);
            const year = date.getFullYear();
            const monthNum = date.getDate() + 1; // getMonth() is zero-based
            month = `${fromdate.split('-')[1]}-${fromdate.split('-')[2]}`;
          } catch (error) {
            console.error(`Error parsing date: ${fromdate}`, error);
            month = 'Invalid Date';
          }

          return {
            ...booking,
            roomType: room.type,
            month
          };
        });

        const revenueByMonthAndRoom = bookingsWithRoomData.reduce((acc, booking) => {
          const { month, roomType, totalamount } = booking;

          if (!acc[month]) {
            acc[month] = { roomTypes: {}, totalRevenue: 0 };
          }
          if (!acc[month].roomTypes[roomType]) {
            acc[month].roomTypes[roomType] = 0;
          }
          acc[month].roomTypes[roomType] += totalamount;
          acc[month].totalRevenue += totalamount;
          return acc;
        }, {});

        const revenueArray = Object.entries(revenueByMonthAndRoom).map(([month, { roomTypes, totalRevenue }]) => ({
          month,
          roomTypes: Object.entries(roomTypes).map(([roomType, revenue]) => ({
            roomType,
            revenue,
            ratio: revenue / totalRevenue
          }))
        }));
        
        revenueArray.sort((a, b) => {
          

          const [monthA, yearA] = a.month.split('-').map(Number);
          const [monthB, yearB] = b.month.split('-').map(Number);
          return new Date(yearA, monthA) - new Date(yearB, monthB);
        });
        
        setMonthlyRevenue(revenueArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Monthly Room Revenue Report</h1>
        {monthlyRevenue.map(({ month, roomTypes }) => (
          <div key={month}>
            <h2>{`${month}`}</h2>
            <table className="table table-dark table-bordered">
              <thead>
                <tr>
                  <th>Room Type</th>
                  <th>Revenue</th>
                  <th>Revenue Ratio</th>
                </tr>
              </thead>
              <tbody>
                {roomTypes.map(({ roomType, revenue, ratio }) => (
                  <tr key={roomType}>
                    <td>{roomType}</td>
                    <td>{revenue.toFixed(2)} VND</td>
                    <td>{(ratio * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}   

export function Payment() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get('/api/bookings/getallbookings');
        const bookings = bookingsResponse.data;

        // Tạo các promise để lấy thông tin phòng
        const roomDataPromises = bookings.map(booking =>
          axios.post('/api/rooms/getroombyid', { roomid: booking.roomid })
        );
        const roomDataResponses = await Promise.all(roomDataPromises);

        // Kết hợp dữ liệu đặt phòng với thông tin phòng
        const bookingsWithRoomData = bookings.map((booking, index) => {
          const room = roomDataResponses[index].data.room;
          return {
            ...booking,
            roomType: room.type,
            rentperday: room.rentperday
          };
        });

        setBookings(bookingsWithRoomData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="row">
      <h1>Hóa Đơn</h1>
      {bookings.map(booking => (
        <div key={booking._id} className="col-md-12">
          <h2>Hóa Đơn #{booking._id}</h2>
          <table className="table table-dark table-bordered">
            <tbody>
              <tr>
                <th>User Id</th>
                <td>{booking.userid}</td>
              </tr>
              <tr>
                <th>Room Id</th>
                <td>{booking.roomid}</td>
              </tr>
              <tr>
                <th>Room Type</th>
                <td>{booking.roomType}</td>
              </tr>
              <tr>
                <th>Rent per day</th>
                <td>{booking.rentperday} VND</td>
              </tr>
              <tr>
                <th>Total Days</th>
                <td>{booking.totaldays}</td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>{booking.totalamount} VND</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}