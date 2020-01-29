const express = require('express')
const cors = require('cors')
require('./src/db/mongoose')
const userRouter = require('./src/routers/user')
const reportRouter = require('./src/routers/report')
const path = require('path')

const app = express()
const port = process.env.PORT

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/reports', reportRouter)

if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`)
})