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
    const [duplicaterooms, setduplicaterooms] = useState([])

    const [searchkey, setsearchkey] = useState('')
    const [type, settype] = useState('all')


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                
                setRooms(data.rooms)
                setduplicaterooms(data.rooms)

               //console.log( duplicaterooms)
               //console.log( data.rooms)
               
                setLoading(false)


            } catch (error) {
                setError(true)
                console.log(error);
                setError(false)
            }
        };

    fetchData(); // Call the async function immediately
  }, []);

  useEffect(() => {
    // This useEffect will run whenever the rooms state changes
    //console.log(rooms);
    //console.log(duplicaterooms)
  }, [rooms]);

  function filterByDate(dates) {
    if (!dates || dates.length === 0) {
        // If dates are null or empty, reset the rooms to the initial state
        setRooms(duplicaterooms);
        setfromdate(null);
        settodate(null);
        return;
    }

    const fromdate = dates[0].format('DD-MM-YYYY');
    const todate = dates[1].format('DD-MM-YYYY');

    setfromdate(fromdate);
    settodate(todate);

    let temprooms = [];
    let availability = false;

    for (const room of duplicaterooms) {
        availability = false;

        if (room.currentbookings.length > 0) {
            for (const booking of room.currentbookings) {
                const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
                const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');
                const from = moment(fromdate, 'DD-MM-YYYY');
                const to = moment(todate, 'DD-MM-YYYY');

                if (
                    from.isBetween(bookingStart, bookingEnd, undefined, '[]') ||
                    to.isBetween(bookingStart, bookingEnd, undefined, '[]') ||
                    bookingStart.isBetween(from, to, undefined, '[]') ||
                    bookingEnd.isBetween(from, to, undefined, '[]')
                ) {
                    availability = false;
                    break;
                } else {
                    availability = true;
                }
            }
        } else {
            availability = true;
        }

        if (availability) {
            temprooms.push(room);
        }
    }

    setRooms(temprooms);
}


    function filterByDate1(dates) {
    setfromdate(dates[0].format('DD-MM-YYYY'));
    settodate(dates[1].format('DD-MM-YYYY'));
  
    let temprooms = [];
    for (const room of duplicaterooms) {
      let availability = true;
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
          const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');
          const from = moment(dates[0], 'DD-MM-YYYY');
          const to = moment(dates[1], 'DD-MM-YYYY');
  
          if (
            from.isBetween(bookingStart, bookingEnd, undefined, '[]') ||
            to.isBetween(bookingStart, bookingEnd, undefined, '[]') ||
            bookingStart.isBetween(from, to, undefined, '[]') ||
            bookingEnd.isBetween(from, to, undefined, '[]')
          ) {
            availability = false;
            break;
          }
        }
      }}}


    function filterbySearch(){
        const temprooms = duplicaterooms.filter( room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(temprooms);
    }

    function filterbyType(e) {
        const selectedType = e.toLowerCase();
    
        if (selectedType !== 'all') {
            const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() === selectedType);
            setRooms(temprooms);
        } else {
            // If 'All' is selected, reset to all rooms
            setRooms(duplicaterooms);
        }
    
        // Also update the selected type state
        settype(selectedType);
    }
    

    


    return (
        <div className='container'>
            
            <div className='row mt-5 bs' >
                <div className='col-md-3'>
                    <RangePicker  format='DD-MM-YYYY' onChange={filterByDate} />
                </div>

                <div className='col-md-4'>
                    <input type="text" className='form-control' placeholder='search rooms'
                        value={searchkey} onChange={(e) => {setsearchkey(e.target.value)}} onKeyUp={filterbySearch}
                    />
                </div>

                <div className='col-md-4'>

                    <select className='form-control' value={type} onChange={(e) => {filterbyType(e.target.value)}}>
                        <option value='all'>All</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                    </select>
                </div>
            </div>


            <div className='row justify-content-center mt-5'>
                {loading ? <Loader /> :  ( rooms.map( (room, index) => {
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
