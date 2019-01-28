import axios from 'axios'
// require('dotenv').config()

//initial state
const initialState = {
  username: '',
  password: '',
  code: 'function setup() {\n\n  }  \n function draw(){ \n\n  }',
  room: '',
  // endpoint: process.env.REACT_APP_ENDPOINT,
  currentSketch: '',
  sketches: [],
  allOtherSketches: [],
  sketchName: '',
  currentUser: ''
}
//constants
const UPDATE_USERNAME = 'UPDATE_USERNAME'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
const CHANGE_ROOM = 'CHANGE_ROOM'
const GET_CODE = 'GET_CODE'
const UPDATE_CODE = 'UPDATE_CODE'
const UPDATE_SKETCH_NAME = 'UPDATE_SKETCH_NAME'
const VIEW_SKETCHES = 'VIEW_SKETCHES'
const GET_OTHER_SKETCHES = 'GET_OTHER_SKETCHES'
const OPEN_SKETCH = 'OPEN_SKETCH'
const SAVE_SKETCH = 'SAVE_SKETCH'
const DELETE_SKETCH = 'DELETE_SKETCH'
const CLEAR_CURRENT = 'CLEAR_CURRENT'
const GET_SESSION_USER = 'GET_SESSOIN_USER'

//action creators
export function getSessionUser() {
  return {
    type: GET_SESSION_USER,
    payload: axios.get('/sessionUser')
  }
}

export function handleUsernameChange(e) {
  return {
    type: UPDATE_USERNAME,
    payload: e.target.value
  }
}
export function handlePasswordChange(e) {
  return {
    type: UPDATE_PASSWORD,
    payload: e.target.value
  }
}
export function handleSketchNameChange(e) {
  return {
    type: UPDATE_SKETCH_NAME,
    payload: e.target.value
  }
}
export function updateCode(code) {
  return {
    type: UPDATE_CODE,
    payload: code
  }
}

export function changeRoom(room) {
  return {
    type: CHANGE_ROOM,
    payload: room
  }
}
export function saveSketch(code, name) {
  return {
    type: SAVE_SKETCH,
    payload: axios.put('/editsketch', {
      code: code,
      sketch_name: name
    })
  }
}

export function viewSketches() {
  return {
    type: VIEW_SKETCHES,
    payload: axios.get('/sketches')
  }
}
export function getOtherSketches() {
  return {
    type: GET_OTHER_SKETCHES,
    payload: axios.get('/otherSketches')
  }
}
export function openSketch(id) {
  return {
    type: OPEN_SKETCH,
    payload: axios.post('/sketches/id', { id })
  }
}
export function deleteSketch(id) {
  return {
    type: DELETE_SKETCH,
    payload: axios.delete(`/sketch${id}`)
  }
}
export function clearCurrentSketch() {
  return {
    type: CLEAR_CURRENT,
    payload: ''
  }
}
export function login(data) {
  return {
    type: LOGIN,
    payload: axios.post('/login', data)
  }
}
export function updateCurrentUser(data) {
  return {
    type: UPDATE_CURRENT_USER,
    payload: data
  }
}
export function logoutHandler() {
  return {
    type: LOGOUT,
    payload: axios('/logout')
  }
}
//reducer
const reducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case GET_SESSION_USER + '_PENDING':
      return { ...state }
    case GET_SESSION_USER + '_REJECTED':
      return { ...state }
    case GET_SESSION_USER + '_FULFILLED':
      return { ...state, currentUser: action.payload.data }
    case LOGIN + '_PENDING':
      return { ...state }
    case LOGIN + '_REJECTED':
      return { ...state }
    case LOGIN + '_FULFILLED':
      return { ...state, currentUser: action.payload.data }
    case LOGOUT + '_PENDING':
      return { ...state }
    case LOGOUT + '_REJECTED':
      return { ...state }
    case LOGOUT + '_FULFILLED':
      return { ...state, currentUser: '' }
    case UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    case UPDATE_USERNAME:
      return { ...state, username: action.payload }
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload }
    case UPDATE_CODE:
      return { ...state, code: action.payload }
    case GET_CODE:
      return { ...state }
    case CHANGE_ROOM:
      return { ...state, room: action.payload }
    case SAVE_SKETCH + '_PENDING':
      return { ...state }
    case SAVE_SKETCH + '_FULFILLED':
      return {
        ...state,
        code: action.payload.data.code,
        currentSketch: action.payload.data.sketch_name
      }
    case VIEW_SKETCHES + '_PENDING':
      return { ...state }
    case VIEW_SKETCHES + '_REJECTED':
      return { ...state }
    case VIEW_SKETCHES + '_FULFILLED':
      return { ...state, sketches: action.payload.data }
    case UPDATE_SKETCH_NAME:
      return { ...state, sketchName: action.payload }
    case OPEN_SKETCH + '_REJECTED':
      return { ...state }
    case OPEN_SKETCH + '_FULFILLED':
      return {
        ...state,
        code: action.payload.data.content,
        currentSketch: action.payload.data.sketch_name
      }
    case DELETE_SKETCH + '_FULFILLED':
      return { ...state, sketches: action.payload.data }
    case DELETE_SKETCH + '_REJECTED':
      return { ...state }
    case GET_OTHER_SKETCHES + '_PENDING':
      return { ...state }
    case GET_OTHER_SKETCHES + '_REJECTED':
      return { ...state }
    case GET_OTHER_SKETCHES + '_FULFILLED':
      return { ...state, allOtherSketches: action.payload.data }
    case CLEAR_CURRENT:
      return {
        ...state,
        currentSketch: action.payload,
        code: 'function setup() {\n\n  }  \n function draw(){ \n\n  }'
      }
    default:
      return state
  }
}
//export
export default reducer
