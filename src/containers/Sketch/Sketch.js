import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { getCode } from '../../ducks/reducer'

class Sketch extends Component {
  state = {
    code: this.props.code
  }
  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.setState({ code: this.props.code })
    }
  }
  render() {
    return (
      //this iframe uses the an html template that loads the code inside of html that has the p5.js library loaded.
      <iframe
        id='canvas_frame'
        className='preview-frame'
        aria-label='sketch output'
        role='main'
        srcDoc={`<!DOCTYPE html>
                    <html>
                      <head>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>
                          <meta charset="utf-8" />
                      </head>
                      <body>
                        <script>
                          ${this.props.code}
                        </script>
                      </body>
                  </html>`}
        frameBorder='0'
        //setting the height of the iframe to be screen responsive. 
        height={window.innerHeight * 0.8}
        width={window.innerWidth * 0.48}
        title='sketch output'
        sandbox='allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-forms allow-modals'
      />
    )
  }
}
const mapStateToProps = state => state

export default connect(
  mapStateToProps
  // { getCode }
)(Sketch)
