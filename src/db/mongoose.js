const mongoose = require('mongoose')

console.log(`MongoDB URI: ${process.env.MONGODB_URI}`)

await mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    .then(res => {
        console.log(`Connected to database`)
    })
    .catch(e => {
        console.log('Not connected to database')
        console.log(`error: ${e}`)
        console.log(`error reason: ${e.reason}`)
        console.log(`stack trace:`)
        console.log(e.stack)
        // const error = {
        //     message: e.message
        // }
        // res.status(400).send(error)
    })

mongoose.connection.on('error', e => {
    console.log(`error during connection: ${e}`)
})