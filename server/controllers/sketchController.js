//return all sketches that have the current User's id attached to them.
async function getSketches(req, res, next) {
  const db = req.app.get('db')
  try {
    let userId = await db.get_user_id([req.session.user.username])
    let sketches = await db.get_sketches([userId[0].id])
    if (sketches) {
      res.status(200).send(sketches)
    } else {
      res.sendStatus(400)
    }
  } catch {
    res.status(400).send('could not get sketches using userId')
  }
}
//returns all sketches that dont have the current User's id attached to them
async function getOtherSketches(req, res, next) {
  const db = req.app.get('db')
  const emptySketches = []
  try {
    let sketches = await db.get_other_sketches([req.session.user.username])
    if (sketches) {
      res.status(200).send(sketches)
    } else {
      res.status(400).send('Could not find sketches')
    }
  } catch {
    res.status(400).send(emptySketches)
  }
}
//returns the code in the current sketches content column 
async function getSketchCode(req, res, next) {
  const db = req.app.get('db')
  try {
    let sketchList = await db.get_sketch_content([req.body.id])
    let sketch = sketchList[0]
    res.status(200).send(sketch)
  } catch {
    console.log('cant get sketch')
  }
}
//posts a sketch to the database with the current Code, Date, User ID, and SketchName.
async function addSketch(req, res, next) {
  const db = req.app.get('db')
  const { content, date, name } = req.body
  try {
    let userId = await db.get_user_id([req.session.user.username])
    let idValue = userId[0].id
    let result = await db.add_sketch([content, idValue, date, name])
    if (result) {
      res.status(200).send(result)
    }
  } catch {
    res.status(200).send('could not add sketch')
  }
}
//deletes a sketch from the data base based on the current sketch id
async function deleteSketch(req, res, next) {
  const db = req.app.get('db')
  let sketch = await db.get_sketch_id([req.params.id])
  if (sketch) {
    try {
      let result = await db.delete_sketch([req.params.id])
      if (result) {
        res.status(200).send(result)
      }
    } catch {
      res.status(400).send('Could not delete sketch')
    }
  }
}
//changes the value of the current sketches Content column.
async function editSketch(req, res, next) {
  const db = req.app.get('db')
  try {
    let updatedSketch = await db.update_sketch_code([req.body.code, req.body.sketch_name])
    if (updatedSketch) {
      return res.status(200).send(updatedSketch)
    } else {
      return res.status(400).send('could not update sketch')
    }
  } catch {
    return res.status(400).send('Could not edit sketch')
  }
}
module.exports = {
  getSketches,
  deleteSketch,
  editSketch,
  addSketch,
  getSketchCode,
  getOtherSketches
}
