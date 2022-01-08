import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import RestaurantModel from "./model.js";
import { router } from "./routes/restaurant.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const restaurantRoute = router;
app.use("/", restaurantRoute);

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
