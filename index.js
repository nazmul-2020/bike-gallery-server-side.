const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pa0zg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const itemsCollection = client.db("bike-gallery").collection("item");

        //get item 
        app.get('/item', async (req, res) => {
            const query = {};
            const cursor = itemsCollection.find(query);
            const item = await cursor.toArray();
            res.send(item);
        })

        


        // POST 
        app.post('/item', async (req, res) => {
            const newItem = req.body;
            const result = await itemsCollection.insertOne(newItem);
            res.send(result);
        })

         // delete 
         app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemsCollection.deleteOne(query);
            res.send(result);
        });

    }

    finally {

    }
}
console.log('mongo connect');
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('welCome To Bike Gallery')
})


app.listen(port, () => {
    console.log('connect', port);
})