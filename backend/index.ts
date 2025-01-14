import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
const mongoose = require("mongoose");
var cors = require('cors')

const PORT = 8000;
const app = express();
app.use(express.json());
// app.use(cors())

//1. Connect mongodb
configDotenv();

const connectMongoDB = async () => {
  const MONGODB_URI: any = process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI);
};

connectMongoDB();

const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
  {
    categoryName: String,
  },
  {
    timestamps: true,
  }
);

const FOOD_SCHEMA = new mongoose.Schema(
  {
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    // category: String,
  },
  {
    timestamps: true,
  }
);

const FoodCategoryModel = mongoose.model("FoodCategory", FOOD_CATEGORY_SCHEMA);

app.get("/food-category", async (req: Request, res: Response) => {
  const foodCategories = await FoodCategoryModel.find();
  res.send(foodCategories);
});

app.get("/food-category/:id", async (req: Request, res: Response) => {
    const id = req.params
  const item = await FoodCategoryModel.find({_id: id});
  res.send(item);
});

app.post("/food-category", async (req: Request, res: Response) => {
  await FoodCategoryModel.create({ categoryName: "Fruits" });
  const foodCategories = await FoodCategoryModel.find();

  res.send(foodCategories);
});
app.put("/food-category/:id", async (req: Request, res: Response) => {
  const { params, body } = req;
//   console.log(body)
  const foodCategoryId = params.id;
  const item = await FoodCategoryModel.find({_id: foodCategoryId})
  const updatedItem = await FoodCategoryModel.findByIdAndUpdate(foodCategoryId, {...item, ...body} , {new: true})

  res.json(updatedItem);
});

app.delete("/food-category/:id",async (req: Request<{ id: string }>, res: Response) => {
    const foodCategoryId = req.params.id;
    const deletedCategory = await FoodCategoryModel.findByIdAndDelete(foodCategoryId);
    res.send("Deleted this item: " + deletedCategory);
  }
);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
