const cors = require("cors")
const express = require("express")
const app = express()
const fs = require('fs')

// const logger = require("./logger")
// app.use(logger)

const questions = require("./questions.json")
const scores = [];

app.use(cors())
app.use(express.json())

app.get("/questions", (req, res) => {
    res.send(questions.questions)
})

app.get("/questions/random", (req, res) => {
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

app.post("/questions/add", (req, res) => {
    questions.questions.push(req.body)
    fs.writeFile('./questions.json', JSON.stringify(questions, null, 2), () => {
        res.status(201).send(req.body);
    })
})

app.delete("/questions/delete/:id", (req, res) => {
    if (req.body > questions.questions.length) {
        res.status(404).send()
    } else {
        questions.questions.splice(req.body - 1, 1)
        res.status(204).send()
    }
})

app.patch("questions/edit", (req, res) => {
    questions.questions[req.body.id] = req.body
    res.status(200)
})

app.post("/scores", (req, res) => {
    scores.push(req.body);
    res.sendStatus(201);
});

app.get("/scores", (req, res) => {
    let sortedScores = scores.sort((a, b) => b.score - a.score);
    res.json(sortedScores);
});

module.exports = app

