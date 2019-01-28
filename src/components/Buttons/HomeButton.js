import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/scss/homeButton.scss'
const AccountButton = () => {
  return (
    <Link to='/home' className='link'>
      <button className='button'>Home</button>
    </Link>
  )
}
export default AccountButton
