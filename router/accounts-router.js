const express = require('express');

//database access using knex

const db = require('../data/dbConfig')

const router = express.Router();

router.get('/',(req, res)=>{
    //select * from accounts
    db.select('*').from('accounts').then(accounts => {
        res.status(200).json({data:accounts})
}).catch(error=> {
    res.status(500).json({error: error.message})
})

})

router.get('/:id', (req, res) => {
    // select * from postman
    const id = req.params.id
    db('accounts').where('id', '=', id)
});

router.post('/', (req, res) => {
    const postData = req.body;
    //validate the data, before calling the data

    //if the data is valid
    db("accounts").insert(postData, 'id').then(ids =>{
        res.status(200).json({data:ids})
    })
    .catch(error =>{
        res.status(500).json({error: error.message})
    })
})

module.exports = router;