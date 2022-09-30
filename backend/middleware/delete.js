const mongoConnect =  require ("../mongodb")
const mongodb = require("mongodb")


const deletedata = async (req,res) => {
    let data = await mongoConnect()
    let result = await data.deleteOne(
        {_id:new mongodb.ObjectId(req.params.id)}
    )
    res.send("Result Deleted Successfully")
    // console.log(res);

}
module.exports = { deletedata}