//Lab 3 MongoDBMigration load directly from files.
//This script will read the files, load two database collections,
//then update the customerdata collection with additional fields.

const mongodb = require('mongodb')
const async = require('async')
const path = require('path');
const fs = require('fs');


// Connection URL
const url = 'mongodb://localhost:27017/mongdbmigration'

// Use connect method to connect to the Server
mongodb.MongoClient.connect(url, (error, db) => {
  if (error) return process.exit(1)
  console.log('Connection is okay')
  var startTime = Date.now()
  console.log('Start time = ', startTime)

  var work = [
    async.apply(fs.readFile, path.join(__dirname, 'm3-customer-data.json')), 
    async.apply(fs.readFile, path.join(__dirname, 'm3-customer-address-data.json'))
  ]
  async.parallelLimit(work, process.argv[2], function (error, results) {
    if (error) throw error; 
    //var combined = mergeJSON.merge(JSON.parse(results[0]), JSON.parse(results[1]))
    db.collection('customersdata').insert(JSON.parse(results[0]), (error, custDataIds) => {
      if (error) throw error
      console.log('Inserted customersdata')
      db.collection('customersaddressdata').insert(JSON.parse(results[1]), (error, custAddDataIds) => {
        if (error) throw error
        console.log('Inserted customersaddressdata')
        db.collection('customersaddressdata').find({_id: {$in: custAddDataIds.insertedIds}}, {sort: {_id: 1}})
        .toArray((error, listOfIds) => {
          if (error) return next(error)
          console.log('fetch of customersaddressdata successful')
          listOfIds.forEach((listValue, i) =>{
            db.collection('customersdata').update({_id: mongodb.ObjectID(custDataIds.insertedIds[i])},
            {$set: {
                     'country': listValue.country,
                     'city': listValue.city,
                     'state': listValue.state,
                     'phone': listValue.phone
                   }},
             (error, record) => {
               if (error) return next(error)
               //console.log('record updated successfully')
            })
          })
          console.log('Records updated successfully')
          var endTime = Date.now()
          console.log('End time = ', endTime)
          console.log('Time elapsed = ', endTime - startTime)
        })
      })
    })
  })
})



