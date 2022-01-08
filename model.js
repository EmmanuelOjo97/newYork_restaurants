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
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  zipcode: {
    type: Number,
    required: true,
  },
});

const RestaurantModel = mongoose.model("restaurants", restaurantsSchema);

export default RestaurantModel;
