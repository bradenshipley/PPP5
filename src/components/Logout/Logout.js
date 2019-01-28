import React from 'react'
import { connect } from 'react-redux'
import { logoutHandler } from '../../ducks/reducer'
import '../../styles/scss/logout.scss'
const Logout = props => {
  return (
    <div className='currentUser'>
      <button
        className='logout'
        onClick={() => {
          props.logoutHandler()
        }}
      >
        Logout
      </button>
      <div className='currentUserName'>
        <span>{props.currentUser}</span>
      </div>
    </div>
  )
}
const mapStateToProps = state => state
export default connect(
  mapStateToProps,
  { logoutHandler }
)(Logout)
