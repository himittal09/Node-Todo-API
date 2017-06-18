const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');



var message = "This is some message";
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'Somesalt').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(data) + 'Somesalt').toString();

// if (resultHash === token.hash) {
//     console.log('Data is perfect');
// } else {
//     console.log('Data is changed');
// }


var token = jwt.sign(data, 'Secret');
var decoded = jwt.verify(token, 'Secret');

console.log(`Token: ${token}`);
console.log(`Decoded data: ${JSON.stringify(decoded)}`);