const mongoose = require('mongoose');

module.exports = async (options = {}) => {
    let dbName = "data_" + process.env.PROJECT_NAME + "_" + process.env.ENVIRONMENT;

    if (process.env.ENVIRONMENT === "development" && !options.silent) {
        mongoose.set('debug', true);
    }

    let mongoConnectionString = `mongodb://${process.env.DB_HOST}:27017/${dbName}`;
    let db = await mongoose.connect(mongoConnectionString, {useNewUrlParser: true}).catch(console.log);

    return db;
};
