import React, { Component } from 'react'
import Sketch from '../../containers/Sketch/Sketch'
import Room from '../../containers/Room/Room'
import Header from '../Header/Header'
import axios from 'axios'
import ViewSketchesButton from '../Buttons/ViewSketchesButton'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  updateCode,
  changeRoom,
  viewSketches,
  logoutHandler,
  login,
  getSessionUser
} from '../../ducks/reducer'
import RoomButtons from '../../containers/Room/RoomButtons'
import socketIOClient from 'socket.io-client'
import { toast } from 'react-toastify'
const socket = socketIOClient()
class Home extends Component {
  state = {
    signedInUser: '',
    showLogin: false,
    showRegister: false,
    showRoomSelector: false
  }
  //getting our user held on our session. This will kick back a GET error if there is none. This will be changed for efficiency to reduce unnecessary requests
  componentDidMount() {
    this.props.getSessionUser()
  }
  //function invoked in our DidMount and DidUpdate hooks. Checks for a room in props,
  // and then sends on room to socket to join, and sets a listener for coding events
  initializeSocket = () => {
    if (this.props.room !== '') {
      const endpoint = process.env.REACT_APP_ENDPOINT
      const socket = socketIOClient(endpoint)
      socket.on('hello', res => console.log(res))
      socket.emit('room', {
        room: this.props.room
      })
      socket.on('receive', data => {
        if (data.room == this.props.room) {
          this.props.updateCode(data.newCode)
        }
      })
      socket.on('joinedroom', data => {
        toast('You have joined room: ' + data)
      })
    }
  }
  //calls our updateCode method in our reducer, and emits 'coding' to the server-side socket.io
  updateCodeInState = newCode => {
    this.props.updateCode(newCode)
    socket.emit('coding', {
      room: this.props.room,
      newCode: newCode
    })
  }
  //method accessible by our child component that will leave the room. This method is called on the componentWillUnmount of the child component
  leaveSocket = () => {
    if (this.props.room) {
      toast(`You have left room ${this.props.room}`)
      socket.emit('leave', {
        room: this.props.room
      })
    }
  }
  //creating a holding function for our logoutHandler, so that we can chain a leaveSocket() call and redirect back to the landing page.
  logout = async () => {
    let result = await this.props.logoutHandler()
    if (result) {
      let result = await this.leaveSocket()
      if (result) {
        this.props.history.push('/')
      }
    }
  }
  //sending a sketch to the attached database. Our database is expecting the following columns : CONTENT, DATE_CREATED, SKETCH_NAME. We will send that information
  //using the current code and sketchName props. This method is referenced in other components as well.
  addSketch = async () => {
    let code =
      this.props.code ||
      'function setup() {\n\n  }  \n function draw(){ \n\n  }'
    await this.props.updateCode(this.props.currentSketch)
    let date = Date.now()
    let name = this.props.sketchName || 'untitled'
    axios
      .post('/addsketch', {
        content: code,
        date: date,
        name: name
      })
      .then(res => {
        toast('Sketch has been added!')
      })
      .catch(err => {
        toast('Could not add sketch')
        console.log(err)
      })
  }
  loginHandler = () => {
    this.props.login({
      user: this.props.username,
      password: this.props.password
    })
  }

  handleRedirect = () => {
    this.props.history.push('/home')
  }
  //determining show of login / register / roomSelector modal.
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
  roomSelectorToggle = () => {
    this.setState({
      showRoomSelector: !this.state.showRoomSelector
    })
  }
  //using a separate register method than the one on our MastheadHeader component so that we can chain a separate login
  registerOnHome = () => {
    axios
      .post('/register', {
        username: this.props.username,
        password: this.props.password
      })
      .then(() => {
        toast('Registered as ' + this.props.username)
        this.loginHandler()
      })
      .catch(err => {
        toast('Could Not Register')
      })
  }
  render() {
    return (
      <div className='Home'>
        <Header
          user={this.state.signedInUser}
          button={<ViewSketchesButton />}
          logout={this.logout}
          register={this.registerOnHome}
          handleShowLogin={this.handleShowLogin}
          handleShowRegister={this.handleShowRegister}
          handleRedirect={this.handleRedirect}
          showLogin={this.state.showLogin}
          showRegister={this.state.showRegister}
          loginHandler={this.loginHandler}
        />
        <RoomButtons
          submitRoom={this.submitRoom}
          selectRoom={this.selectRoom}
          roomSelectorToggle={this.roomSelectorToggle}
          showRoomSelector={this.state.showRoomSelector}
          handleRoomTextChange={this.handleRoomTextChange}
          leaveSocket={this.leaveSocket}
          addSketch={this.addSketch}
        />
        <div className='coding-window'>
          <Room
            initializeSocket={this.initializeSocket}
            leaveSocket={this.leaveSocket}
            updateCodeInState={this.updateCodeInState}
            showLogin={this.state.showLogin}
            showRegister={this.state.showRegister}
            showRoomSelector={this.state.showRoomSelector}
          />
          <Sketch />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default withRouter(
  connect(
    mapStateToProps,
    {
      updateCode,
      changeRoom,
      viewSketches,
      logoutHandler,
      login,
      getSessionUser
    }
  )(Home)
)
