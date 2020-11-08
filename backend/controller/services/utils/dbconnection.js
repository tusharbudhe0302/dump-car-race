const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/f1race';
mongoose.Promise = global.Promise;
let mongooConnection = false;
const createMongoDbConnection = async () => {
    return new Promise((resolve, rejects) => {
        if (mongooConnection) {
            resolve(mongooConnection);
        } else {
            mongoose.connect(
                mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            }
            ).then(() => {
                mongooConnection = mongoose;
                resolve(mongoose);
            }).catch((ex) => {
                rejects(ex);
            });
        }
    })
};
module.exports.mongoose = {
    createmongodbconnection: createMongoDbConnection,
    mongoose: mongoose
}