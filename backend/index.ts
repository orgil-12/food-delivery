import { error } from "console";
import { configDotenv } from "dotenv";
import express, {Request, Response} from "express";
const mongoose = require('mongoose');

const PORT = 8000;
const app = express();
app.use(express.json());


//1. Connect mongodb
configDotenv();

const connectMongoDB = async () =>{
    const MONGODB_URI:any = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI)
}

connectMongoDB()

const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
    {
        categoryName : String,
    },
    {
        timestamps: true
    }
);

const FoodCategoryModel = mongoose.model('FoodCategory', FOOD_CATEGORY_SCHEMA)

app.get('/',async(req: Request, res: Response) => {
    
    const foodCategories = await FoodCategoryModel.find()
    res.send(foodCategories);
});

app.get('/create',async(req: Request, res: Response) => {
    
    await FoodCategoryModel.create({categoryName: "Fruits"})
    const foodCategories = await FoodCategoryModel.find()

    res.send(foodCategories);
});


app.listen(PORT,() => {
    console.log(`Server is Running on http://localhost:${PORT}`)
});