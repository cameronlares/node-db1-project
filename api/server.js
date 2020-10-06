const express = require("express");

const db = require("../data/dbConfig.js");

const AccountRouter = require("../router/accounts-router")


const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter)

server.get("/", (req, res) => {
    res.status(200).json({api: "Api Running"})
})

module.exports = server;
