const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

mongoose.connection.on('disconnected', () => {
  console.info('[Service:Database] Disconnected.')

  // [optional] exit app when database is disconnected
  // process.exit(1);
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('INFO: Node is down. So the Mongoose.')

    process.exit(0)
  })
})

module.exports = connectDB
