const express = require("express");
const {connectDB} = require("./db");
const router = express.Router();

router.get("/list/cu", (req, res) => {
    connectDB.query('SELECT * FROM cu', (error, result) => {
        if (error) return console.log(error, 'check');

        res.send(result)
    })
})

router.get("/list/emart", (req, res) => {
    connectDB.query('SELECT * FROM emart', (error, result) => {
        if (error) return console.log(error, 'check');

        res.send(result)
    })
})

module.exports = router;
