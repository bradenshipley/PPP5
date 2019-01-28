import React from 'react'
import '../../styles/scss/login.scss'
const Login = props => {
  return (
    <div className='modal-login'>
      <h3>Login</h3>
      <div className='modal-inputs'>
        <input
          type='text'
          placeholder='username'
          val={props.username}
          onChange={props.usernameChange}
        />
        <input
          type='password'
          placeholder='password'
          val={props.password}
          onChange={props.passwordChange}
        />
      </div>
      <div className='modal-buttons'>
        <button onClick={props.show}>Cancel</button>
        <button onClick={props.login}>Submit</button>
      </div>
    </div>
  )
}
export default Login
