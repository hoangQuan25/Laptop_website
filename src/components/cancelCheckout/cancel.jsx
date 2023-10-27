import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './cancel.css'

const Cancel = () => {
  return (
    <div className="cancel-container">
        <div className="cancel-message">
            <h1><MdOutlineCancel /></h1>
            <h1>Your payment has been cancelled...</h1>
            <Link to='/product' className='btn'>Continue shopping!</Link>
        </div>
    </div>
  )
}

export default Cancel