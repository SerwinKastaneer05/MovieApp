const {MongoClient} = require("mongodb");
//mongo db url
const url = "mongodb+srv://newuser:newuser@cluster0.gnilp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
database = "imdb" //database name
const client = new MongoClient(url);

async function mongoConnect(){
    const result = await client.connect();
    db = result.db(database);
    return db.collection("imdb-v1");  //collection name
}

module.exports = mongoConnect;