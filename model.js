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
  // longitude: {
  //   type: Number,
  //   min: -180,
  //   max: 180,
  // },
  // latitude: {
  //   type: Number,
  //   min: -90,
  //   max: 90,
  // },
  // zipcode: {
  //   type: Number,
  // },
});

const RestaurantModel = mongoose.model("restaurants", restaurantsSchema);

export default RestaurantModel;
