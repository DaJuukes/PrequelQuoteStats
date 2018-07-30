const mongoose = require('mongoose');

let s = {
    name: "Quote",
    schema: new mongoose.Schema({
        quote: {
            type: String
        },
        username: {
            type: String
        }
    },{
        timestamps: true
    })
};

module.exports = mongoose.model(s.name, s.schema);
