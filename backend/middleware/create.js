const mongoConnect = require("../mongodb")

const createdata = async(req,res)=>{
    let isExist=false;
    
    let data = await mongoConnect();
    let check = await data.find().toArray();

    for (let i = 0; i < check.length; i++) {
      if (check[i].email==req.body.email){
        if(check[i].id===req.body.id){
            isExist=true;
            console.log("title already in the watchlist")
        }
      }
      }
      if (isExist===false){
        let result = await data.insertOne(req.body)
        // console.log("added to watchlist")
        res.send("Added to Your Watchlist")
      }
      
   
}

module.exports = {createdata}