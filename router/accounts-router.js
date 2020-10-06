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
    const {id} = req.params
db.select('*').from("accounts").where({id}).first()// same as grabbing the first element from the array manuall with post[0]
.then(account => {
    res.status(200).json({data: account})
})
.catch(error => {
    handleError(error, res)
})
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

router.put('/:id', (req, res) => {
    const changes = req.body
    const id = req.params.id
    //please validate data before calling the database

    db('accounts').where({ id: id }).update({changes}).then(count => {
        res.status(201).json({data: count})
    }) // another way of writing a where
    .catch(error => {
        res.status(500).json({ error: error.message})
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db("accounts")
        .where({ id })
        .del() // don't forget to have a where
        .then(count => {
            // count is the number of records deleted
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: "there was no record to delete" });
            }
        })
        .catch(error => {
            handleError(error, res);
        });
});

function handleError(error, res) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
}
module.exports = router;