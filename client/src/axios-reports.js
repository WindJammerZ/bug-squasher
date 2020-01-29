import axios from 'axios'

const instance = axios.create({
    //local instance
    // baseURL: `http://localhost:5000/api`

    //production server
    baseURL: `https://jk-bug-squasher-application.herokuapp.com/api`
})

export default instance