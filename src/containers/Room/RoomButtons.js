import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import RoomSelector from './RoomSelector'
import JoinButton from './SocketButtons/JoinButton'
import LeaveButton from './SocketButtons/LeaveButton'
import {
  saveSketch,
  changeRoom,
  handleSketchNameChange,
  clearCurrentSketch
} from '../../ducks/reducer'
import { toast } from 'react-toastify'

class RoomButtons extends Component {
  state = { roomText: '', filterState: false }
  selectRoom = () => {
    this.props.changeRoom(this.state.roomText)
  }
  handleRoomTextChange = text => {
    this.setState({
      roomText: text
    })
  }
  leaveRoom = () => {
    let room = ''
    this.props.changeRoom(room)
    this.props.leaveSocket()
  }
  filterCheckHandler = () => {
    toast('cannot save another persons sketch')
    this.setState({ filterState: true })
  }
  render() {
    //using this filter check to see if the currently loaded sketch is present in the allOtherSketches array, which means it was created by someone other than 
    //the currently logged in user. If so, the sketch will not be able to be saved and instead will display the "Add Sketch"
    //button, which will allow the user to add a new sketch name and add it to the their own array of sketches.
    //this mimics 'forking' on github 
    const filterCheck = this.props.allOtherSketches.filter(
      otherSketch => otherSketch.sketch_name === this.props.currentSketch
    )
    return (
      <div className='roomButtons'>
        {!this.props.room ? (
          <JoinButton roomSelectorToggle={this.props.roomSelectorToggle} />
        ) : (
            <LeaveButton leaveRoom={this.leaveRoom} />
          )}
        {this.props.currentSketch && !this.state.filterState ? (
          <button
            onClick={() => {
              filterCheck.length
                ? this.filterCheckHandler()
                : this.props.saveSketch(
                  this.props.code,
                  this.props.currentSketch
                )
            }}
          >
            Save Sketch
          </button>
        ) : this.state.filterState ? (
          <>
            <button onClick={this.props.addSketch}>Add Sketch </button>
            <input
              type='text'
              onChange={e => {
                this.props.handleSketchNameChange(e)
              }}
              placeholder='Sketch Name'
            />
          </>
        ) : null}
        {!this.props.currentSketch ? (
          <>
            <button onClick={this.props.addSketch}>Add Sketch </button>
            <input
              type='text'
              onChange={e => {
                this.props.handleSketchNameChange(e)
              }}
              placeholder='Sketch Name'
            />
          </>
        ) : (
            <button onClick={this.props.clearCurrentSketch}>New Sketch</button>
          )}
        <Modal
          show={this.props.showRoomSelector}
          modalClosed={this.props.roomSelectorToggle}
          className='Modal'
        >
          <RoomSelector
            selectRoom={this.selectRoom}
            handleRoomTextChange={this.handleRoomTextChange}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default withRouter(
  connect(
    mapStateToProps,
    { saveSketch, changeRoom, handleSketchNameChange, clearCurrentSketch }
  )(RoomButtons)
)
