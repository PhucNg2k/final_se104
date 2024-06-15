import { Link } from "react-router-dom"
import React from 'react'

function Landingscreen() {
    return (
        <div className='row landing justify-content-center'>
            <div className="col-md-9 my-auto text-center" style={{borderRight: '5px solod white'}}>
                <h2 style={{color: 'white', fontSize:'230px'}}>HOTEL</h2>
                <h1 style={{color: 'white'}}>There is only one boss. The Guest</h1>
                <Link to='/login'>
                    <button className="btn landingbtn" style={{color:'black'}} >Get Started</button>
                </Link>
            </div>
        </div>
    )
}

export default Landingscreen