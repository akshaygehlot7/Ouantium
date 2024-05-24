const mongoose = require('mongoose')

// DB_URI = "mongodb+srv://akshaygehlot:akshaygehlot003@cluster0.vopkzgq.mongodb.net/shopIT?retryWrites=true&w=majority&appName=Cluster0"


const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true
    }).then((data) => {
        console.log(`Mongodb connected with Host: ${data.connection.host}`);
      });
}
module.exports = connectDatabase 