const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/{name-of-the-collection}'

const connectDb = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Mongodb connected')
    } 
    catch (err) {
        console.error(err.message)
        // exit the app when there is failure in connecting to the database
        process.exit(1)
    }
}
module.exports = connectDb
