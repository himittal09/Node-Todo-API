const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log(`Error Occured, Unable to connect to MongoDB server: ${error}`);
    }
    console.log('Successfully connected to MongoDB server');

    db.collection('Users').find({
        name: 'Himanshu'
    }).toArray().then((document) => {
        console.log(document);
    }, (error) => {
        console.log(`Error Occured: ${error}`);
    });

    db.close();
});