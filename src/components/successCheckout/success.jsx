import React from 'react'
import { MdDoneOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './success.css'

const Success = () => {
  return (
    <div className="success-container">
        <div className="success-message">
            <h1><MdDoneOutline /></h1>
            <h1>Payment successfully!</h1>
            <Link to='/product' className='btn'>Continue shopping!</Link>
        </div>
    </div>
  )
}

export default Success