import React, {useState, useEffect} from 'react'
import axios from 'axios'


function Homescreen() {
    
    const [rooms, setRooms] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log('123')
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                console.log('data', data.rooms.length);
                
                setRooms(data.rooms.length)
                console.log('rooms', rooms)
            } catch (error) {
                
                console.log(error);
            }
        };

        fetchData(); // Call the async function immediately
    }, [rooms]);


    return (
        <div>
            <h1>Home screen 1</h1>
            <h1>there are {rooms} rooms</h1>
        </div>
    )
}

export default Homescreen