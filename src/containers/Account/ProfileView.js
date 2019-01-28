import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Notice from './Notice'
import {
  viewSketches,
  deleteSketch,
  openSketch,
  getOtherSketches,
  getSessionUser
} from '../../ducks/reducer'
import '../../styles/scss/profileView.scss'

class ProfileView extends Component {
  state = {
    mounted: false
  }
  //using an asynchronous function to check for a user on session, and load sketches if there is. 
  async componentDidMount() {
    let result = await this.props.getSessionUser()
    if (result) {
      try {
        this.props.viewSketches()
        this.props.getOtherSketches()
      } catch {
        console.log('no user on session yet')
      }
    }
  }
  //using our openSketch method held in the reducer to change the current state of code to the code in the attached sketch. Once the function completes,
  //the code displayed on the code editor will be the code loaded in openSketch.
  editHandler = async id => {
    let result = await this.props.openSketch(id)
    if (result) {
      this.props.history.push('/home')
    }
  }
  //checking against previously signed in user, whether or not it's the first time we signed in, and whether or not the list of sketches changed
  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.props.getSessionUser()
    }
    if (
      !prevProps.currentUser &&
      this.props.currentUser &&
      (prevProps.currentUser !== this.props.currentUser ||
        prevProps.sketches !== this.props.sketches)
    ) {
      this.props.viewSketches()
    }
    if (
      this.props.currentUser &&
      prevProps.allOtherSketches !== this.props.allOtherSketches
    ) {
      this.props.getOtherSketches()
    }
  }
  //controlling whether or not the component updates to prevent runaway updates.
  shouldComponentUpdate(prevProps) {
    return (
      (this.props.currentUser &&
        prevProps.allOtherSketches !== this.props.allOtherSketches) ||
      prevProps.sketches !== this.props.sketches ||
      prevProps.currentUser !== this.props.currentUser
    )
  }
  //creating a delete handler to reload the sketches after deleting one from them
  handleDeleteClick = async id => {
    let result = await this.props.deleteSketch(id)
    if (result) {
      this.props.viewSketches()
    }
  }
  render() {
    //creating a sketches variable
    let sketches
    //if the sketches array has items it, we map over them and render individual sketches of each item
    this.props.sketches
      ? (sketches = this.props.sketches.map(sketch => {
        return (
          <div className='individual-sketch' key={sketch.id}>
            <h4>{sketch.sketch_name}</h4>
            <button onClick={() => this.editHandler(sketch.id)}>Open</button>
            <button
              onClick={() => {
                this.handleDeleteClick(sketch.id)
              }}
            >
              Delete
              </button>
          </div>
        )
      }))
      : (sketches = null)
    //creating an allOtherSketches variable
    let allOtherSketches
    //if the allOtherSketches array has items it, we map over them and render individual sketches of each item
    this.props.allOtherSketches
      ? (allOtherSketches = this.props.allOtherSketches.map(sketch => {
        return (
          <div className='individual-sketch' key={sketch.id}>
            <h4>{sketch.sketch_name}</h4>
            <span>Created by: {sketch.username}</span>
            <button onClick={() => this.editHandler(sketch.id)}>Open</button>
          </div>
        )
      }))
      : (allOtherSketches = null)
    //if there is someone logged in, render the following, else display the "Login please" notice component
    return this.props.currentUser ? (
      <div className='container'>
        <div className='sketchesView'>
          {/* Rendering a welcome message if there is nothing to map over */}
          These are your own sketches : {sketches.length ? sketches : <><br />
            Add a sketch to start!</>}
        </div>
        <div className='otherSketchesView'>
          {/*
           Repeating the same for allOtherSketches, though there will almost always be something to render, this is left in should the database be wiped
          we don't have have any rendering errors
          */}
          These are sketches created by others:{allOtherSketches.length ? allOtherSketches : null}
        </div>
      </div>
    ) : (
        <Notice />
      )
  }
}

const mapStateToProps = state => state

export default withRouter(
  connect(
    mapStateToProps,
    { viewSketches, openSketch, deleteSketch, getOtherSketches, getSessionUser }
  )(ProfileView)
)
