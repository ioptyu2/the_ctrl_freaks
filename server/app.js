const cors = require("cors")
const express = require("express")
const app = express()

// const logger = require("./logger")
// app.use(logger)

const easy = require("./easyQuestions.json")
const medium = require("./mediumQuestions.json")
const hard = require("./hardQuestions.json")

// app.use("/easyQuestions", express.json())
// app.use("/mediumQuestions", express.json())
// app.use("/hardQuestions", express.json())

app.use(cors())
app.use(express.json())

app.get("/easyQuestions", (req, res) => {
    res.send(easy)
})

app.get("/mediumQuestions", (req, res) => {
    res.send(medium)
})

app.get("/hardQuestions", (req, res) => {
    res.send(hard)
})

module.exports = app
