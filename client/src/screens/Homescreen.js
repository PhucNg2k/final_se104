import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loaders'
import Error from "../components/Error"

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
                {loading ? (
                    <Loader/>
                ) : rooms.length>1 ? (
                    rooms.map( (room, index) => {
                        return <div className='col-md-9 mt-2' key={index}>
                            <Room room={room} />
                        </div>;
                    })
                ) : (
                    <Error/>
                )}
            </div>

        </div>
    )
 
}

export default Homescreen