import mongoose from "mongoose";

const restaurantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  borough: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
});

const RestaurantModel = mongoose.model("restaurants", restaurantsSchema);

export default RestaurantModel;
