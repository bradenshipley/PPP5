const bcrypt = require('bcryptjs')
//login function. check for username in database, then compare hash with given password. If we pass, set the current user on session
//to the signed in user.
async function login(req, res) {
  const db = req.app.get('db')
  console.log('this is the req.body at the server', req.body)
  let foundUser = await db.get_user([req.body.user])
  const user = foundUser[0]
  if (user)
    try {
      const correctPass = await bcrypt.compare(req.body.password, user.hash)
      if (!correctPass) {
        res.status(400).send('Password does not match')
      } else {
        req.session.user = {
          username: req.body.user
        }
        res.status(200).send(req.session.user.username)
      }
    } catch {
      console.log('This username is already in use')
    }
}
//destroys the current session.
function logout(req, res, next) {
  req.session.destroy()
  return res.status(200).send('you logged out of it')
}
//checks for a username on the users table of the database, and kicks back if there is one. Else it posts the form data into the users table
async function register(req, res) {
  const db = req.app.get('db')
  const { username, password } = req.body
  let foundUser = await db.get_user([username])
  const user = foundUser[0]
  console.log(user)
  if (!user)
    try {
      let hash = await bcrypt.hash(password, 10)
      db.register_user([username, hash])
      res.status(200).send('you have registered')
    } catch {
      res.status(401).send('there is already a user by this name')
    }
}
function getSessionUser(req, res) {
  if (req.session.user.username) {
    res.status(200).send(req.session.user.username)
  } else {
    res.status(400).send('could not get username')
  }
}
module.exports = {
  login,
  register,
  logout,
  getSessionUser
}
