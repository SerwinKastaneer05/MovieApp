const express = require("express") // using express 
const router = express.Router();
// requiring each middleware functionalities
const createfile = require("../middleware/create"); //inserting data to mongodb
const readfile = require("../middleware/read"); //read data from db
const readapi = require("../middleware/readapi"); //reading api 
const readfileone = require("../middleware/readone"); //reading data using ID
const deletefile = require("../middleware/delete"); //deleting using ID

// Routes to connect to database
router.post('/insert',createfile.createdata);//route inserting data to mongodb
router.get('/read',readfile.readdata);
router.get('/readapi',readapi.apidata);
router.get('/read/:id',readfileone.readone);
router.delete('/delete/:id',deletefile.deletedata);


module.exports = router;