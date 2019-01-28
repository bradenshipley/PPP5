import React, { Component } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Logout from '../Logout/Logout'
import axios from 'axios'
import Modal from '../Modal/Modal'
import {
  handleUsernameChange,
  handlePasswordChange,
  updateCurrentUser
} from '../../ducks/reducer'
import '../../styles/scss/mastheadHeader.scss'

class MastheadHeader extends Component {
  state = { showLogin: false, showRegister: false }
  //async login function so that we can update the current user in props and redirect to the home page
  login = async () => {
    axios
      .post('/login', {
        username: this.props.username,
        password: this.props.password
      })
      .then(res => {
        this.props.updateCurrentUser(res.data)
        this.handleRedirect()
      })
      .catch(err => {
        toast('Could Not Login')
        console.log(err)
      })
  }
  register = () => {
    axios
      .post('/register', {
        username: this.props.username,
        password: this.props.password
      })
      .then(res => {
        this.handleRedirect()
      })
      .catch(err => {
        toast('Could Not Register')
        console.log(err)
      })
  }
  handleRedirect = () => {
    this.props.history.push('/home')
  }
  handleShowLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }
  handleShowRegister = () => {
    this.setState({
      showRegister: !this.state.showRegister
    })
  }

  render() {
    return (
      <div className='inputs'>
        {!this.props.currentUser ? (
          <>
            <div className='Tryout'>
              <button onClick={() => this.handleRedirect()}>Try It Out!</button>
            </div>
            <div className='Login'>
              <button onClick={this.handleShowLogin}>Login</button>
              <Modal
                show={this.state.showLogin}
                modalClosed={this.handleShowLogin}
              >
                <Login
                  login={this.login}
                  passwordChange={this.props.handlePasswordChange}
                  usernameChange={this.props.handleUsernameChange}
                  show={this.handleShowLogin}
                />
              </Modal>
            </div>
            <div className='Register'>
              <button onClick={this.handleShowRegister}>Register</button>
              <Modal
                show={this.state.showRegister}
                modalClosed={this.handleShowRegister}
              >
                <Register
                  register={this.register}
                  passwordChange={this.props.handlePasswordChange}
                  usernameChange={this.props.handleUsernameChange}
                  show={this.handleShowRegister}
                />
              </Modal>
            </div>
          </>
        ) : (
            <Logout />
          )}
      </div>
    )
  }
}

const mapStateToProps = state => state
export default withRouter(
  connect(
    mapStateToProps,
    {
      handlePasswordChange,
      handleUsernameChange,
      updateCurrentUser
    }
  )(MastheadHeader)
)
