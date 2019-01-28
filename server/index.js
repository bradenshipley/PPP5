const path = require('path'); // Usually moved to the start of file
require('dotenv').config()
//imports
const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const { json } = require('body-parser')
const massive = require('massive')
//socket.io imports
const http = require('http')
const socketIo = require('socket.io')

//destructuring
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
//controller destructuring
const {
  login,
  register,
  logout,
  getSessionUser
} = require('./controllers/userController')
const {
  getSketches,
  editSketch,
  deleteSketch,
  addSketch,
  getSketchCode,
  getOtherSketches
} = require('./controllers/sketchController')


const app = express()
//socket.io constants
const server = http.createServer(app)
const io = socketIo(server)

app.use(json())
//session code
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
)
//database connection
massive(CONNECTION_STRING)
  .then(db => {
    app.set('db', db)
    console.log('database is connected')
  })
  .catch(err => {
    console.log(err)
  })

//socket.io listeners
io.on('connection', socket => {
  console.log('a user connected'),
    socket.emit('hello', { greeting: 'hello world' })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('room', data => {
    socket.join(data.room).emit('joinedroom', data.room)
  })
  socket.on('leave', room => {
    socket.emit('leave', room).leave(room)
    // socket.leave(room)
  })
  socket.on('coding', data => {
    console.log('socket hears the coding event. here is the room:', data.room)
    socket.to(data.room).emit('receive', data)
  })
})
//login endpoint
app.post(
  '/login',
  (req, res, next) => {
    if (!req.session.user) {
      console.log('hit session check')
      req.session.user = {}
      console.log(req.session.user)
      next()
    } else {
      next()
    }
  },
  login
)
//register endpoint
app.post(
  '/register',
  (req, res, next) => {
    console.log(req.body)
    next()
  },
  register
)
//logout endpoint
app.get('/logout', logout)
//get sketches
app.get('/sketches', getSketches)
//get session user endpoint
app.get('/sessionUser', getSessionUser)
//get other sketches
app.get(
  '/otherSketches',
  (req, res, next) => {
    if (!req.session.user) {
      console.log('hit session check')
      req.session.user = {}
      console.log(req.session.user)
      next()
    } else {
      next()
    }
  },
  async (req, res, next) => {
    const db = req.app.get('db')
    let result = await db.get_user([req.session.user.username])
    if (result) {
      next()
    } else {
      res.status(301).redirect('/')
    }
  },
  getOtherSketches
)
//get sketch code
app.post('/sketches/id', getSketchCode)
//add sketch
app.post('/addsketch', addSketch)
//delete sketches
app.delete('/sketch:id', deleteSketch)
//edit sketch
app.put('/editsketch', editSketch)
//build endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
//server listening
server.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`)
})
