import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import routes from './router/routes'

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer autoClose={1500} />
        <div className='container'>{routes}</div>
      </div>
    )
  }
}

export default App
