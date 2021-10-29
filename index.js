const express = require("express");
const { MongoClient } = require('mongodb');
const app = express();
const cors = require("cors");

const ObjectId = require('mongodb').ObjectId;


const port = process.env.PORT || 5500;
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://ashikali:xhBqOU5UBobmWTXt@cluster0.muk27.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    const database = client.db("practices");
    const userCollection = database.collection("users");
   
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const result = await cursor.toArray()
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      console.log(req.body);
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.json(result);
    })

    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, ()=> {
  console.log("Horrah!!! my node is working!")
})