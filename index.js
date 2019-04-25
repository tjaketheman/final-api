const express = require('express');
const app = express();
const port = process.env.PORT || 5005;
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ConnectionURL = "mongodb+srv://tjaketheman:owner1@mycluster-zfcy6.mongodb.net/test?retryWrites=true";
const dbName = "Pantrack";

app.get('/', function (req, res) {
    return res.send('Hello World');
});

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

app.get('/', (req, res) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    })
})

app.post('/pantry/add', cors(), (req, res) => {
    const body = req.body
    collection.insertOne(body, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        return res.status(200).send(body)
    })
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})