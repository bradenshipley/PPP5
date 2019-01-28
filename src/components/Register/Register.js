import React from 'react'
import '../../styles/scss/register.scss'
const Register = props => {
  return (
    <div className='modal-register'>
      <h3>Register</h3>
      <div className='modal-inputs'>
        <input
          type='text'
          placeholder='username'
          onChange={props.usernameChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={props.passwordChange}
        />
      </div>
      <div className='modal-buttons'>
        <button onClick={props.show}>Cancel</button>
        <button onClick={props.register}>Register</button>
      </div>
    </div>
  )
}
export default Register
