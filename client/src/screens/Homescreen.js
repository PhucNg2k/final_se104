import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from 'antd';
import moment from 'moment'
import 'antd/dist/reset.css'
import { useAsyncError } from 'react-router-dom';
const { RangePicker } = DatePicker;
function Homescreen() {
    
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                
                setRooms(data.rooms)
                setLoading(false)


            } catch (error) {
                setError(true)
                console.log(error);
                setError(false)
            }
        };

    fetchData(); // Call the async function immediately
  }, []);

  function filterByDate(dates){
    setfromdate( dates[0].format('DD-MM-YYYY'))
    settodate( dates[1].format('DD-MM-YYYY'))
  }


    return (
        <div className='container'>
            
            <div className='row mt-5'>
                <div className='col-md-3'>
                    <RangePicker format='DD-MM-YYY' onChange={filterByDate} />
                </div>

            </div>


            <div className='row justify-content-center mt-5'>
                {loading ? <Loader /> : error ? <Error/> : ( rooms.map( (room, index) => {
                    return <div className='col-md-9 mt-2' key={index}>
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>;
                    })
                ) }
            </div>
            
        </div>
    )
}

export default Homescreen;
