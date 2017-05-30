const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log(`Error Occured, Unable to connect to MongoDB server: ${error}`);
    }
    console.log('Successfully connected to MongoDB server');


    db.collection('users').deleteMany({/*name: 'Himanshu'*/}).then((result) => {
        // console.log(`Collection Deletion successful: ${JSON.stringify(result.result, undefined, 4)}`);
    }, (error) => {
        console.log(`Error Deleting data: ${error}`);
    });


    // db.collection('Users').findOneAndDelete({name: 'Prashant'}).then((result) => {
    //     console.log(`Collection Deletion successful: ${JSON.stringify(result, undefined, 4)}`);
    // }, (error) => {
    //     console.log(`Error Deleting data: ${error}`);
    // });

    db.close();
});