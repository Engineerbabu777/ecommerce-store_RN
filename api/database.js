const mongoose = require("mongoose");
const variable = require('./constants');


const databaseConnect = () => {
    mongoose.connect(variable.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> {
        console.log('Connected to database!');
    })
}


module.exports = databaseConnect;