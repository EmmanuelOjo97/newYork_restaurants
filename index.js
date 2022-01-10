import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import RestaurantModel from "./model.js";
import { router } from "./routes/restaurant.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "swagger-jsdoc";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "New York City Restaurants",
      description:
        "A REST API built using Node, Express and Mongodb of New york City restaurants.  Check out the code on [GitHub](https://github.com/EmmanuelOjo97/newYork_restaurants).",
    },
  },
  apis: ["./routes/restaurant.js"],
};
const swaggerDocs = swaggerDocument(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 *
 */

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
