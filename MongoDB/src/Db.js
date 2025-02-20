const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aditya2125csit1033:87zv88eofemo3ief@cluster0.ck1ok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

module.exports = { connectToDB, client };
