import React from 'react'

const backdrop = props =>
  props.show ? <div className='Backdrop' onClick={props.clicked} /> : null
export default backdrop
