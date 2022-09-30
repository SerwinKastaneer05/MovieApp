const mongoConnect = require('../mongodb')

const readdata = async (req,res)=>{
    let data = await mongoConnect();
    let result = await data.find().toArray();

    res.send(result);
}
module.exports = {readdata}