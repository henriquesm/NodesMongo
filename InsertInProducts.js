var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = [
  { _id: 157, name: 'Chocolate Heaven' },
  { _id: 158, name: 'Tasty Lemons' },
  { _id: 159, name: 'Vanilla Dreams' }
];
  db.collection("products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
