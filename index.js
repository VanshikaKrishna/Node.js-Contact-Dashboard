// const express = require('express')
import express from "express"
const app = express()
// const mongoose = require('mongoose')

// const Contact = require("./models/contacts.model")

import ContactRoutes from "./routes/contacts.routes.js"
import {connectDB} from "./config/database.js"

const PORT = process.env.PORT
connectDB()

//Middleware

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use("/", ContactRoutes)


app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}. `)
})