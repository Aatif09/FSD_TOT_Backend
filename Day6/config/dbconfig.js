const mongoose = require('mongoose');
// Connect to MongoDB and connect

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://root:root@cluster0.cuhpw.mongodb.net/abes_fsd?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);

  }

}
// module.exports = connectDB;
connectDB();


// Create Schema

