import React, { Component } from 'react'
import MastheadHeader from './MastheadHeader'
import Particle from '../Particle/Particle'
import '../../styles/scss/masthead.scss'

class Masthead extends Component {
  render() {
    return (
      <>
        <div className='Particle'>
          <Particle />
        </div>
        <div className='Masthead'>
          <div className='Header'>
            <MastheadHeader />
          </div>
          <div className='Welcome'>
            <div className='Logo'>
              <h1>PPP5</h1>
            </div>
            <h3> a P5.js pair programming application built in React.</h3>
          </div>
        </div>
      </>
    )
  }
}

export default Masthead
