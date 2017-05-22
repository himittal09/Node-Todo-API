const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log(`Error Occured, Unable to connect to MongoDB server: ${error}`);
    }
    console.log('Successfully connected to MongoDB server');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5922e748fde5abc62f782e50')
    }, {
        $set: {
            location: 'Raipur'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((results) => {
        console.log('Updation Successful!!');
        console.log(results);
    }, (error) => {
        console.log(`Error Occured: ${error}`);
    });

    db.close();
});