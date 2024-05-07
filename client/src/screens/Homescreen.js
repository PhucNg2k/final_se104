import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Room from '../components/Room'

function Homescreen() {
    
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
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


    return (
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : ( rooms.map( (room, index) => {
                    return <div className='col-md-9 mt-2' key={index}>
                        <Room room={room} />
                    </div>;
                    })
                ) }
            </div>
            
        </div>
    )
}

export default Homescreen