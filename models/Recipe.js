import { Schema, model, models } from "mongoose";

const RecipeSchema = new Schema({
  photo: String,
  title: String,
  source: String,
  description: String,
  "prep-hours": String,
  "prep-minutes": String,
  "cook-hours": String,
  "cook-minutes": String,
  ingredients: [
    {
      amount: String,
      unit: String,
      ingredient: String,
      note: String
    }
  ],
  "prep-notes": [
    {
      time: Number,
      note: String
    }
  ],
  directions: String,
  "main-ingredient": String,
  tags: [String],
  author: {
    id: String,
    name: String,
    email: String,
    nickname: String
  }
});

export default models.Recipe || model("Recipe", RecipeSchema);
