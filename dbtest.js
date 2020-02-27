
// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://merriet:PmqXTVjRCBcmpsRc@cluster0-gzmbr.mongodb.net/mario?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true  });
// client.connect(err => {
//   if(err){
//     console.log('Error')
//   }
//   const collection = client.db("mario").collection("test_collection");
//   console.log(collection)
//   // perform actions on the collection object
//   client.close();
// });
const mongoose = require("mongoose");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongo DB Connected")).catch(err => console.log('ErorrRRRRRRRRRRRRRRRRRR'));
