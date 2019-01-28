import React, { Component } from 'react'
import Codemirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript.js'
import '../../styles/scss/room.scss'
// import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux'
import { getSessionUser } from '../../ducks/reducer'

class Room extends Component {
  //if the room changes, re-initialize the socket with the current room.
  componentDidUpdate(prevProps) {
    if (this.props.room !== prevProps.room) {
      console.log('got to didUpdate conditional')
      this.props.initializeSocket()
      this.props.getSessionUser()
    }
  }
  //if our room changes, or we have a room and the code changes, update.
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.room !== this.props.room ||
      (this.props.room && nextProps.code !== this.props.code) ||
      nextProps.showLogin !== this.props.showLogin ||
      nextProps.showRegister !== this.props.showRegister ||
      nextProps.showRoomSelector !== this.props.showRoomSelector
    )
  }
  componentDidMount() {
    console.log('this is this.props.room', this.props.room)
    this.props.initializeSocket()
  }
  // leave room when unmounting the component, to reduce data leak
  componentWillUnmount() {
    this.props.leaveSocket()
  }

  render() {
    //setting options for codemirror editor
    let options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'material',
      showCursorWhenSelecting: true,
      autofocus: true,
      indentUnit: 4
    }
    let style
    this.props.showLogin ||
      this.props.showRegister ||
      this.props.showRoomSelector
      ? (style = { zIndex: -1 })
      : (style = { zIndex: 5 })
    return (
      <div className='RoomContainer'>
        <div className='Codemirror-Container' style={style}>
          <Codemirror
            className='Codemirror'
            value={this.props.code}
            onChange={this.props.updateCodeInState}
            options={options}
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(
  mapStateToProps,
  { getSessionUser }
)(Room)
