import React, {useState, useEffect} from 'react'
import axios from 'axios'


function Homescreen() {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                setRooms(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Call the async function immediately
    }, []);


    return (
        <div>
            <h1>Home screen</h1>
            <h1>there are {rooms.length} rooms</h1>
        </div>
    )
}

export default Homescreen