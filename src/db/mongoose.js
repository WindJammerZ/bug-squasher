const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {})
    .catch(e => {
        const error = {
            message: e.message
        }
        res.status(400).send(error)
    })