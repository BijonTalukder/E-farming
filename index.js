const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app= express();
require('dotenv').config();
app.use(cors())
app.use(express.json())
console.log(process.env.DB_USER)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ywgnkn8.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const database=client.db('FlowByte')
        const categories=database.collection('categories');
        const userCollection=database.collection('userCollection');
        app.get('/category/:id',async(req,res)=>{
            const id=parseInt( req.params.id);
            console.log(id)
            const query={categoryId:id}
            const cursor=categories.find(query)
            const result=await cursor.toArray();
            console.log(query)
            res.send(result)
            console.log(result)

        })
        app.post('/users',async(req,res)=>{
            const user=req.body;
            const result=await userCollection.insertOne(user)
            res.send(result)

        })

    }
    catch{

    }

}
run().catch(console.log)

app.get('/',async(req,res)=>{
    res.send('runnig')
})
app.listen(port,()=>{
    console.log(port)
})