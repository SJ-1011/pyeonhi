const express = require("express");
const {connectDB} = require("./db");
const router = express.Router();

router.get("/list/cu", (req, res) => {
    connectDB.query('SELECT * FROM cu LIMIT 2', (error, result) => {
        if (error) return console.log(error, 'check');

        res.send(result)
    })
})

router.get("/list/gs", (req, res) => {
    connectDB.query('SELECT * FROM cu LIMIT 3', (error, result) => {
        if (error) return console.log(error, 'check');

        res.send(result)
    })
})

router.get("/list/emart", (req, res) => {
    connectDB.query('SELECT * FROM emart LIMIT 10', (error, result) => {
        if (error) return console.log(error, 'check');

        res.send(result)
    })
})

module.exports = router;
