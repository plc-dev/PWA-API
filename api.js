const express = require('express');
const mongodb = require("mongodb");

const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await loadTaskCollection();
    res.send(await tasks.find({}).toArray());
});

router.post('/', async (req, res) => {
    const tasks = await loadTaskCollection();
    await tasks.insertOne({
        note: req.body.note[0],
        akkord3: req.body.akkord3,
        createdAt: new Date()
    });
    res.status(201).send();
});

async function loadTaskCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://plc:notenlernen19@ds159216.mlab.com:59216/it_beleg', {
        useNewUrlParser: true
    });

    return client.db('it_beleg').collection('tasks');
}

module.exports = router;