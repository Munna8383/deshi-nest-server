const express = require("express")
const cors = require("cors")
const app= express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://deshi-nest:deshi-nest@cluster0.akl91ab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const productCollection = client.db("Deshi-Nest").collection("productDB")









    app.get("/products",async(req,res)=>{


        const page =parseInt(req.query.page)
        const size =parseInt(req.query.size)
        const search = req.query.search
        const  brand = req.query.brand 
        const  category = req.query.category 


        const query = 
            {
              productName:{$regex:search, $options:"i"}
            }

      
        if(brand){

          query.$or = [
            { 
              brand : brand
            }
        ];
        }
      
        if(category){

          query.$or = [
            { 
              category : category
            }
        ];
        }



       


        const result = await productCollection.find(query).skip(page*size).limit(size).toArray()

        res.send(result)


    })


    app.get("/productCount",async(req,res)=>{

        const count = await productCollection.estimatedDocumentCount()
        res.send({count})
    })











    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











app.get("/",async(req,res)=>{

    res.send("deshi-nest pay is running")
})


app.listen(port,()=>{
    console.log("server running")
})