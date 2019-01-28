import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/scss/viewSketchesButton.scss'
const ViewSketches = () => {
  return (
    <Link to='/account' className='link'>
      <button className='button'>View Sketches</button>
    </Link>
  )
}
export default ViewSketches
