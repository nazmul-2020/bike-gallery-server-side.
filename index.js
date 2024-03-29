const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const res = require('express/lib/response');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pa0zg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://bike-gallery:6rCQawuvO3dtNvng@cluster0.pa0zg.mongodb.net/?retryWrites=true&w=majority";

// var uri = "mongodb://bike-gallery:6rCQawuvO3dtNvng@cluster0-shard-00-00.pa0zg.mongodb.net:27017,cluster0-shard-00-01.pa0zg.mongodb.net:27017,cluster0-shard-00-02.pa0zg.mongodb.net:27017/?ssl=true&replicaSet=atlas-ofx4o1-shard-0&authSource=admin&retryWrites=true&w=majority";

const uri = "mongodb+srv://bike-gallery:PgX49iiexHkpj85b@cluster0.pa0zg.mongodb.net/?retryWrites=true&w=majority";
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

        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemsCollection.findOne(query);
            res.send(item);
        })


        // POST item
        app.post('/item', async (req, res) => {
            const newItem = req.body;
            const result = await itemsCollection.insertOne(newItem);
            res.send(result);
        })


        delete item
        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemsCollection.deleteOne(query);
            res.send(result);
        });


        // update quantity
        app.put("/item/:id", async (req, res) => {
            const filter = { _id: ObjectId(req.params.id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: req.body,
            };
            const result = await itemsCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });


        // app.get('/myItem', async(req, res)=> {
        //     const decodedEmail = req.decoded.email;
        //     const email = req.query.email;
        //     // console.log(email);
        //     if(email === decodedEmail){
        //       const query = {email: email};
        //       const cursor = itemsCollection.find(query);
        //       const items = await cursor.toArray();
        //       res.send(items)
        //     }
        //     else{
        //       res.status(403).send({message: 'Forbidden access'})
        //     }
        //   })


        

        app.get('/myItem', async (req, res) => {
            const email = req.query.email;
            console.log(email)
            const query = { email: email };
            // const query = {};
            const cursor = itemsCollection.find(query);
            const item = await cursor.toArray();
            res.send(item);
        })

    }

    finally {

    }

}
console.log('mongo connect Hasan');
run()

app.get('/', (req, res) => {
    res.send('welCome To Bike Gallery connect')
})


app.listen(port, () => {
    console.log('connect', port);
})