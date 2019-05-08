const express = require('express');
const app = express();
const port = process.env.PORT || 5005;
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
// const MongoClient = require('mongodb').ObjectID;
const ConnectionURL = "mongodb+srv://tjaketheman:owner1@mycluster-zfcy6.mongodb.net/test?retryWrites=true";
const dbName = "Pantrack";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pantrySchema = new Schema({
    name: { type: String, required: true, max: 20 },
    amount: { type: Number, required: true },
    unit: { type: String, required: true }

}, {collection: 'Users'});

const pantryModel = mongoose.model('pantryModel', pantrySchema);

app.listen(port, () => {
    MongoClient.connect(ConnectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(dbName);
        collection = database.collection("Users");
        console.log("Connected to `" + dbName + "`!");
    });
});

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }));

// app.param('id', (req, res, next, id) =>{
//     const item = _.find(items, {_id: _id});

//     if (item) {
//         req.item = item;
//         next();
//     } else {
//         res.send(err);
//     }
// })

app.get('/pantry', (req, res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    })
})

app.get('/pantry/:id', (req, res) => {
    collection.findOne(req.params._id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
            }
        res.send(result);
    })
})

app.post('/pantry/add', cors(), (req, res) => {
    const body = req.body
    collection.insertOne(body, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(body)
    })
})

app.put('/pantry/:id', (req, res) => {
    const item = req.params;
    collection.findOne(req.params._id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
     name = req.body.name;
    amount = req.body.amount;
    unit = req.body.unit;
        
    return res.status(200).send(result);
    })
    


    // const data = {
    //     name: req.body.name,
    //     amount: req.body.amount,
    //     unit: req.body.unit,
    // };
    // console.log(data)
    // pantryModel.updateOne({"_id": req.body._id}, {$set: data}, (err, result) => {
    //     if (err) {
    //         return res.status(500).send(err);
    //         }
    //     res.send(result);
    // })
})

app.delete('/pantry/:id', (req, res) => {
    collection.findOne(req.params._id, )
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})