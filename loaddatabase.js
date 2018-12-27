//Lab 3 MongoDBMigration load files to database.
//This script does not merge and is meant to be run
//prior to mergedata.js as if they database collections
//already existed.

const mongodb = require('mongodb')
const path = require('path');
const fs = require('fs');

// Connection URL
const url = 'mongodb://localhost:27017/mongdbmigration'

// Use connect method to connect to the Server
mongodb.MongoClient.connect(url, (error, db) => {
  if (error) return process.exit(1)
  console.log('Connection is okay')

  var custData = fs.readFileSync(path.join(__dirname, 'm3-customer-data.json'))
  var custAddData = fs.readFileSync( path.join(__dirname, 'm3-customer-address-data.json'))

  //console.log(JSON.parse(custData))

  db.collection('customersdata').insert(JSON.parse(custData), (error) => {
  if (error) throw error
  console.log('Inserted customersdata')
  })

  db.collection('customersaddressdata').insert(JSON.parse(custAddData), (error) => {
    if (error) throw error
    console.log('Inserted customersaddressdata')
    })
})


