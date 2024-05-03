import React, {useState, useEffect} from 'react'
import axios from 'axios'


function Homescreen() {
    
    const [rooms, setRooms] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log('123')
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                console.log('data', data);
                
                setRooms(data)
                console.log(rooms)
            } catch (error) {
                
                console.log(error);
            }
        };

        fetchData(); // Call the async function immediately
    }, []);


    return (
        <div>
            <h1>Home screen 1</h1>
            <h1>there are 5 {rooms.length} rooms</h1>
        </div>
    )
}

export default Homescreen