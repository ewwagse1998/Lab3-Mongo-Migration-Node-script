//Lab 3 MongoDBMigration Merge data from exisiting db collection
//This script will add the corresponding phone and address fields 
//to the customer data collection.  You must run loaddatabase.js 
//prior to running this script so the database has records.

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

  var work = [
    function (callback) {
      db.collection('customersdata').find()
      .toArray((error, custIds) => {
        if (error) throw error
        console.log('fetch of customersdata successful')
        db.collection('customersaddressdata').find()
        .toArray((error, custAddIds) => {
          if (error) throw error
          console.log('fetch of customersaddressdata successful')
          custIds.forEach((custValue, i) =>{
            db.collection('customersdata').update({_id: mongodb.ObjectID(custValue._id)},
            {$set: {
                    'country': custAddIds[i].country,
                    'city': custAddIds[i].city,
                    'state': custAddIds[i].state,
                    'phone': custAddIds[i].phone
                  }
            },
            (error, record) => {
            if (error) throw error
          })
        })
      })
    })
    callback()}
  ]
  async.parallelLimit(work, process.argv[2], function (error, results) {
    if (error) throw error; 
    console.log('Records updated successfully')
    var endTime = Date.now()
    console.log('Limit Value =', process.argv[2])
    console.log(results.length)
    console.log('Processing time = ', endTime-startTime)  
  })
})



