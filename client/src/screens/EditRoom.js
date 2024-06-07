import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    rentperday: '',
    maxcount: '',
    phoneNumber: '',
    surcharge: ''
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.post('/api/rooms/getroombyid', { roomid: id });
        setRoom(response.data.room);
        setFormData({
          name: response.data.room.name,
          type: response.data.room.type,
          rentperday: response.data.room.rentperday,
          maxcount: response.data.room.maxcount,
          phoneNumber: response.data.room.phoneNumber,
          surcharge: response.data.room.surcharge
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/rooms/updateroom/${id}`, formData);
      navigate(`/rooms/${id}`);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

  return (
    <div>
      <h1>Edit Room</h1>
      {room && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input type="text" className="form-control" name="type" value={formData.type} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Rent per day</label>
            <input type="number" className="form-control" name="rentperday" value={formData.rentperday} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Max count</label>
            <input type="number" className="form-control" name="maxcount" value={formData.maxcount} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Surcharge</label>
            <input type="text" className="form-control" name="surcharge" value={formData.surcharge} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      )}

      
    </div>
    
  );
}

export default EditRoom;
