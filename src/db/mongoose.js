const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
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
        console.log(e)
        console.log(e.stack)
    })

mongoose.connection.on('error', e => {
    console.log(`error during connection:`)
    console.log(e)
    console.log(e.stack)
})