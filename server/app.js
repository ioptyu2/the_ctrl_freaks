const cors = require("cors")
const express = require("express")
const app = express()

// const logger = require("./logger")
// app.use(logger)

const questions = require("./questions.json")

app.use(cors())
app.use(express.json())

app.get("/questions", (req, res) => {
    res.send(questions)
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

app.post("/questions/add/:question", (req, res) => {
    questions.push(req.body)
    req.statusCode(201).send(req.body)
})

app.delete("/questions/delete/:id", (req, res) => {
    if(req.body > questions.questions.length){
        res.status(404).send()
    }else{
        questions.questions.splice(req.body - 1, 1)
        res.status(204).send()
    }
})

module.exports = app
