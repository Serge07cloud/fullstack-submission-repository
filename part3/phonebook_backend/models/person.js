const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log('Connecting to database')

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('Connection succeeded')
  })
  .catch((error) => console.log('Connection failed:', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\d{2,3})-\d{5,}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
