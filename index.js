import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import RestaurantModel from "./model.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/read", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.find().limit(200);
    res.json(restaurant);
    // res.send("this is a lot of data");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
