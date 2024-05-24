const express = require("express")
const app = express()
const path = require("path");

app.use(express.json())

const user = require("./Routes/userRoutes")

// const errorMiddleware = require("./middleware/errorMiddleware")

app.use('/api/users', user)


// Middleware to handle error
// app.use(errorMiddleware);
module.exports = app