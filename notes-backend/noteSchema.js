const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

/**
 * create a new property called 'id' and remove _id and __v from the returned document
 
 * */


/**
 * also, Even though the _id property of Mongoose objects looks like a string, it is in fact an object. The toJSON method we defined transforms it into a string just to be safe. If we didn't make this change, it would cause more harm to us in the future once we start writing tests.
 */

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note