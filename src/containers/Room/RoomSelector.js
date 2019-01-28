import React from 'react'
import '../../styles/scss/roomSelector.scss'
const roomSelector = props => {
  return (
    <div className='roomSelector'>
      <span>Enter A Room Name Below</span>
      <br />
      <input
        type='text'
        placeholder='Room Name'
        onChange={e => props.handleRoomTextChange(e.target.value)}
      />
      <button className='roomSelectorButton' onClick={() => props.selectRoom()}>
        Submit
      </button>
    </div>
  )
}
export default roomSelector
