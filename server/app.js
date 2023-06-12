const cors = require("cors")
// import json files goes here
const easy = require("./easyQuestions.json")
const medium = require("./mediumQuestions.json")
const hard = require("./hardQuestions.json")
const express = require("express")
const app = express()
// const logger = require("./logger")
// app.use(logger)

app.use("/easyQuestions", express.json())
app.use("/mediumQuestions", express.json())
app.use("/hardQuestions", express.json())




module.exports = app
