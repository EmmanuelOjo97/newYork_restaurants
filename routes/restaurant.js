import express from "express";
import mongoose from "mongoose";
import RestaurantModel from "../model.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: The New York City Restaurants API
 */

/**
 * @swagger
 * /read:
 *   get:
 *     description: All Restaurants
 *     summary: Returns the list of all restaurants
 *     tags: [Restaurants]
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
 *     summary: Returns specific restaurants by id
 *     tags: [Restaurants]
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
 *     summary: Post a restaurant
 *     tags: [Restaurants]
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

/**
 * @swagger
 * /read/{restaurantId}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: restaurantId
 *        required: true
 *        type: string
 *        description: The restaurant ID.
 *      - in: body
 *        name: restaurant
 *        description: Update restaurant
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            cuisine:
 *              type: string
 *            borough:
 *              type: string
 *     responses:
 *       201:
 *         description: Restaurant updated
 *       500:
 *         description: Error message
 *     summary: Update a restaurant
 *     tags: [Restaurants]
 */

router.patch("/read/:restaurantId", async (req, res) => {
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

/**
 * @swagger
 * /delete/{restaurantId}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: restaurantId
 *        required: true
 *        type: string
 *        description: The restaurant Id.
 *     description: Delete a restaurant by id
 *     summary: Delete a restaurant
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Restaurant updated
 *       500:
 *         description: Error message
 */

router.delete("/delete/:restaurantId", async (req, res) => {
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

export { router as router };
