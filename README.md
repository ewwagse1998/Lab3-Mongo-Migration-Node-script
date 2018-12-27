# Lab3-Mongo-Migration-Node-script
Migrate data from two files into mongodb using Async Parallel

1. Walk us through the design of your project. Why did you design your project the way you did? What difficulties did you overcome?

2. How did you test your project to verify that it works? 

3. Let us know if anything doesn't work as intended so your reviewers can know ahead of time

Answers:

1.  I actually created 2 scripts as I was unsure if we were supposed to be merging from existing mongoDB collections or if we were supposed to read from the files.  So my "server.js" script reads from the files and then creates 2 collections.  It then updates the customer data collection with the phone and address fields.  I also created two other scripts one that simply loads the files into two collections "loaddatabase.js".  This script needs to be run prior to "mergedata.js".  Merge data then reads the existing collections and then addes the phone and adress fields to the customer data collection.  

2.  I tested the first script by simply running the script and then using "mongoui" to view the collection.  I would use monogo shell to drop the database in order to retest.  I was able to update the customer data with the phone and address on both accounts.

3.  I had issues with how to set up "Parallel". I don't think I used it properly for determinig how many async tasks were run in order to load the database.  So while I did use Parellel Limit and I do pass in the CLI argument, I am not sure if it is working as requested.




server.js

//Lab 3 MongoDBMigration load directly from files.
//This script will read the files, load two database collections,
//then update the customerdata collection with additional fields.

loaddatabase.js

//Lab 3 MongoDBMigration load files to database.
//This script does not merge and is meant to be run
//prior to mergedata.js as if they database collections
//already existed.

mergedata.js

//Lab 3 MongoDBMigration Merge data from exisiting db collection
//This script will add the corresponding phone and address fields 
//to the customer data collection.  You must run loaddatabase.js 
//prior to running this script so the database has records.
