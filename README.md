# Bug Squasher

A web-capable Bug/Feature tracker.  This project was implemented to help improve my MERN and RESTFUL API development skills.

Demo: https://jk-bug-squasher-application.herokuapp.com/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

**MongoDB** cluster to which you can connect.  Go to (https://www.mongodb.com/) and follow the instructions to create a cluster.

**Node.js** installed.  Go to (https://nodejs.org/en/) to get the latest version.

If you want to deploy to a live server you will need to have a provider that can host a Node.js server.  I used **Heroku**.  If you don't have an account go to (https://www.heroku.com/).

### Installing

Download or clone the repo

```
git clone https://github.com/<your-user-name>/bug-squasher.git
```

You will need to create a config folder in the root directory with a dev.env file inside as such:
```
root directory
└─ config
   └─ dev.env
```

Then create the following environment variables inside of dev.env:
```
PORT=<insert the port you want the backend server to listen on such as 5000>
MONGODB_URI='<insert your MongoDB connection string>'
JWT_SECRET=<insert your jwtSecret phrase here for encryption>
```

Install backend dependencies
```
npm install
```
Install frontend dependencies
```
npm run client-install
```
Run frontend and backend with concurrently
```
npm run dev
```
Run backend only
```
npm run server
```
Run frontend only
```
npm run client
```
Backend runs on http://localhost:<PORT value in env file, usually 5000>

Frontend runs on http://localhost:3000

## Deployment

There is a Heroku post build script so there should be no need to manually build the ReactJS app.

## Built With

* [MongoDB](https://www.mongodb.com/) - The online database
* [Express.js](https://expressjs.com/) - A web framework for Node.js
* [ReactJS](https://reactjs.org/) - The frontend library to develop the UI
* [Node.js](https://nodejs.org/en/) - A Javascript Runtime to build the network portion of this application
* [Mongoose.js](https://mongoosejs.com/) - MongoDB object modeling for Node.js

## Author

**Jonathan Kent** - [WindJammerZ](https://github.com/WindJammerZ)

## License

This project is licensed under the MIT License
