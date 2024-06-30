import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        
        const response = await axios.post("/api/rooms/getroombyid", { roomid: id });
        setRoom(response.data.room);
        console.log(response.data)
        console.log(response.data.room)

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

  return (
    <div>
    
      <h1>Edit Room</h1>
      {room && (
        <div>
          <p>Room ID: {room._id}</p>
          <p>Name: {room.name}</p>
          <p>Type: {room.type}</p>
          <p>Rent per day: {room.rentperday}</p>
          <p>Max count: {room.maxcount}</p>
          <p>Phone Number: {room.phoneNumber}</p>
          <p>Surcharge: {room.surcharge}</p>
          {/* Add form fields to edit room information */}
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/admin')}>
        Go to Admin
      </button>
    </div>
  );
}

export default RoomDetails;