import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  handlePasswordChange,
  handleUsernameChange,
  login
} from '../../ducks/reducer'
import Modal from '../Modal/Modal'
import Login from '../Login/Login'
import Logout from '../Logout/Logout'
import Register from '../Register/Register'
import '../../styles/scss/header.scss'
const logo = require('../../images/paint-brush.png')

const Header = props => {
  let loginModal = (
    <div className='Login'>
      <button onClick={props.handleShowLogin}>Login</button>
      <Modal show={props.showLogin} modalClosed={props.handleShowLogin}>
        <Login
          login={props.loginHandler}
          passwordChange={props.handlePasswordChange}
          usernameChange={props.handleUsernameChange}
          show={props.handleShowLogin}
        />
      </Modal>
    </div>
  )
  let registerModal = props.showRegisterButton ? null : (
    <div className='Register'>
      <button onClick={props.handleShowRegister}>Register</button>
      <Modal show={props.showRegister} modalClosed={props.handleShowRegister}>
        <Register
          register={props.register}
          passwordChange={props.handlePasswordChange}
          usernameChange={props.handleUsernameChange}
          show={props.handleShowRegister}
        />
      </Modal>
    </div>
  )
  return (
    <div className='Header'>
      <div className='title'>
        <img
          onClick={() => props.history.push('/')}
          style={{ cursor: 'point' }}
          className='logo'
          src={logo}
          alt='PPP5'
        />
      </div>
      <div className='button'>{props.button}</div>
      <div className='username-or-guest'>
        {!props.currentUser ? (
          <>
            {loginModal}
            {registerModal}
          </>
        ) : (
          <Logout />
        )}
      </div>
    </div>
  )
}
const mapStateToProps = state => state
export default withRouter(
  connect(
    mapStateToProps,
    { handlePasswordChange, handleUsernameChange, login }
  )(Header)
)
