// const {MongoClient, ObjectID} = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error)
        return console.log(`Error Occured, Unable to connect to MongoDB server: ${error}`);
    console.log('Successfully connected to MongoDB server');
    
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (error, result) => {
        if (error)
            return console.log(`Error Occured, Unable to insert to the collection: ${error}`);
        console.log(JSON.stringify(result.ops, undefined, 4));
    });
    

    db.collection('Users').insertOne({
        name: 'Himanshu',
        age: 19,
        location: 'Chhattisgarh, India, 495668'
    }, (error, result) => {
        if (error) {
            return console.log(`Error Occured, Unable to insert to the collection: ${error}`);
        }
        console.log(JSON.stringify(result.ops, undefined, 4));
        console.log(`The Timestamp is: ${result.ops[0]._id.getTimestamp()}`);
    });

    db.close();
});