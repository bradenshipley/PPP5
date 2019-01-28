import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Backdrop from './Backdrop'
import '../../styles/scss/modal.scss'
class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    )
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className='Modal'
          style={{
            transform: this.props.show
              ? 'translateY(+60vh)'
              : 'translateY(+100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </>
    )
  }
}
Modal.propTypes = {
  show: PropTypes.bool
}
export default Modal
