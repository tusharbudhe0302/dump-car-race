const mongoose = require('mongoose');

const callback = (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Succesfully Connected!');
    }
}

const connectDatabase = () => {
    console.log(`process.env.mongoUrl: ${process.env.mongoUrl}`);
    const mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/f1race';
    return mongoose.connect(mongoUrl, { useCreateIndex: true, useNewUrlParser: true }, exports.callback);
}

exports.callback = callback;
exports.connectDatabase = connectDatabase;
exports.mongoose = mongoose;
