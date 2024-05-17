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

  function filterByDate(dates){
    const fromdate = dates[0].format('DD-MM-YYYY')
    const todate =  dates[1].format('DD-MM-YYYY')
    console.log(dates[0].format("DD-MM-YYYY"));
    console.log(dates[1].format("DD-MM-YYYY"));

    console.log( fromdate)
    console.log( todate)
    
    let temprooms = []
    let availability = false
    for( const room of duplicaterooms){
        console.log(room)
        availability = false;
        if( room.currentbookings.length > 0){
           
                for (const booking of room.currentbookings){
                    // check between
                    console.log(booking.fromdate)
                    console.log( booking.todate)
                    console.log( availability )
                    if (  ( !moment(fromdate).isBetween(booking.fromdate, booking.todate, '[]' ))
                    &&    ( !moment(todate).isBetween(booking.fromdate, booking.todate, '[]' )) )  {
                        
                        console.log(moment(fromdate).isBetween(booking.fromdate, booking.todate, '[]' ))
                        
                        console.log(moment(todate).isBetween(booking.fromdate, booking.todate, '[]' ))
                        
                        if ( // check equal
                            fromdate !== booking.fromdate &&
                            fromdate !== booking.todate &&
                            todate !== booking.fromdate &&
                            todate !== booking.todate
                        ) {
                            availability = false;
                        }
                    }
                }
                
        
        }

        if (availability == true || room.currentbookings.length==0){
            temprooms.push( room )
        }
    
        console.log( temprooms)
        
        setRooms(temprooms);
        
    }
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
