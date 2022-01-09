import express from "express";
import mongoose from "mongoose";
import RestaurantModel from "../model.js";

const router = express.Router();

/**
 * @swagger
 * /read:
 *   get:
 *     description: All Restaurants
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 *       501:
 *         description: Error Message
 */

router.get("/read", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.find({}).limit(100);
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /read/{restuarantId}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: restuarantId
 *        required: true
 *        type: string
 *        description: The restaurant Id.
 *     description: Get a restaurant by id
 *     responses:
 *       200:
 *         description: Returns the requested restaurant
 *       501:
 *         description: Error Message
 */

router.get("/read/:restuarantId", async (req, res) => {
  try {
    const restuarant = await RestaurantModel.findById(req.params.restuarantId);
    res.json(restuarant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/:borough", async (req, res) => {
//   try {
//     const borough = await RestaurantModel.find({
//       borough: req.params.borough,
//     }).limit(100);
//     res.json(borough);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

/**
 * @swagger
 * /post:
 *   post:
 *     parameters:
 *      - in: body
 *        name: restaurant
 *        description: New restaurant
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            borough:
 *              type: string
 *            cuisine:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 *       501:
 *         description: Error Message
 */

router.post("/post", async (req, res) => {
  try {
    const restaurants = await new RestaurantModel({
      name: req.body.name,
      borough: req.body.borough,
      cuisine: req.body.cuisine,
      //   zipcode: req.body.zipcode,
      //   longitude: req.body.longitude,
      //   latitude: req.body.latitude,
    });
    console.log(restaurants);
    restaurants.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:restaurantId", async (req, res) => {
  try {
    const deleteRestaurant = await RestaurantModel.remove({
      _id: req.params.restaurantId,
    });
    console.log("Item deleted");
    res.send("Item Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:restaurantId", async (req, res) => {
  try {
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      req.params.restaurantId,
      { name: req.body.name }
    );
    res.send("Item updated");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as router };
