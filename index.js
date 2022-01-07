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
    const restaurant = await RestaurantModel.find({
      name: "Riviera Caterer",
    }).limit(100);
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/post", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
