const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        console.log(`Connected to database`)
    })
    .catch(e => {
        console.log('Not connected to database')
        const error = {
            message: e.message
        }
        res.status(400).send(error)
    })