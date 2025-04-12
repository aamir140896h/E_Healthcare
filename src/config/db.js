import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB successfukky connectede");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
