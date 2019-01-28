import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import ProfileView from './ProfileView'
import HomeButton from '../../components/Buttons/HomeButton'
import { connect } from 'react-redux'
import Notice from './Notice'
import { logoutHandler, login } from '../../ducks/reducer'
import '../../styles/scss/account.scss'
import axios from 'axios'
import { toast } from 'react-toastify'

class Account extends Component {
  state = {
    showLogin: false,
    showRegister: false
  }
  //using an asynchronous function to logout, and if the logout is successful, push the user to the masthead
  logout = async () => {
    let result = await this.props.logoutHandler()
    if (result) {
      this.props.history.push('/')
    }
  }
  //using an asynchronous function to login, and redirect the user to the home page if successful
  loginHandler = async () => {
    let result = await this.props.login({
      user: this.props.username,
      password: this.props.password
    })
    if (result) {
      this.props.history.push('/home')
    }
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
  register = () => {
    axios
      .post('/register', {
        username: this.props.username,
        password: this.props.password
      })
      .then(() => {
        this.handleRedirect()
      })
      .catch(err => {
        toast('Could Not Register')
        console.log(err)
      })
  }
  render() {
    //creating a Display variable, that will be rendered as the profileView component or the "Please login" Notice component based on whether or not there 
    //is a current user signed in
    let Display
    this.props.username
      ? (Display = (
        <ProfileView
          username={this.props.username}
          sketches={this.props.sketches}
        />
      ))
      : (Display = <Notice />)
    return (
      <div className='account'>
        <Header
          button={<HomeButton />}
          className='accountHeader'
          logout={this.logout}
          register={this.register}
          handleShowLogin={this.handleShowLogin}
          handleShowRegister={this.handleShowRegister}
          handleRedirect={this.handleRedirect}
          showLogin={this.state.showLogin}
          showRegisterButton='false'
          loginHandler={this.loginHandler}
        />
        <div className='display'>{Display}</div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(
  mapStateToProps,
  { logoutHandler, login }
)(Account)
