import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {


    return (
        <div className="NavBar">

            <Link className='customLink' to="/" >Home</Link>
            <Link className='customLink' to="/Update" >View Tasks</Link>

        </div>

    )
}

export default Navbar