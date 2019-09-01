const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

const messageSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Number, default: Date.now },
})

const Message = mongoose.model('Message', messageSchema)

const repo = {
  all: () => Message.find(),
  create: fields => new Message(fields).save(),
}

module.exports = repo
