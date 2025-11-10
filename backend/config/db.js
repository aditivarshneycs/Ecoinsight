import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in environment variables");
      console.error("Please set MONGO_URI in your .env file");
      process.exit(1);
    }

    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`🌿 MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error("\n📝 Troubleshooting steps:");
    console.error("1. Check if MONGO_URI is set in your .env file");
    console.error("2. Verify your MongoDB connection string is correct");
    console.error("3. Ensure MongoDB is running and accessible");
    console.error("4. Check your network/firewall settings");
    console.error("\n⚠️ Server will continue but database operations will fail until connection is established.\n");
    // Don't exit - allow server to start even if DB fails initially
    // This allows the server to run and show better error messages
  }
};

export default connectDB;
