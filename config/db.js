const mongoose = require("mongoose")
const CONNECTION_STRING = "mongodb://localhost:27017/mydb"
// const CONNECTION_STRING = process.env.MONGODB_URI
console.log(process.env)
const connectDB = async () => {
    try{
        await mongoose.connect(
            CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log("MongoDB Connected Successfully")
    }catch(err){
        console.log("DB Err" , err)
    }
}
module.exports = connectDB