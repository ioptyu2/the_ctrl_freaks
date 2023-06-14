const cors = require("cors")
const express = require("express")
const app = express()

// const logger = require("./logger")
// app.use(logger)

const questions = require("./questions.json")

app.use(cors())
app.use(express.json())

app.get("/questions", (req, res) => {
    res.send(questions.questions)
})

app.get("/questions/easy", (req, res) => {
    res.send(questions.questions.filter(q => q.category === "easy"))
})

app.get("/questions/intermediate", (req, res) => {
    res.send(questions.questions.filter(q => q.category === "intermediate"))
    res.send(questions)
})

app.get("/questions/hard", (req, res) => {
    res.send(questions.questions.filter(q => q.category === "hard"))
    res.send(questions)
})

module.exports = app
