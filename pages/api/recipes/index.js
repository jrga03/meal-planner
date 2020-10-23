import connectToDatabase from "utils/connectToDb";
import Recipe from "models/Recipe";

connectToDatabase();

export default async function saveRecipe(req, res) {
  try {
    // const { start } = req.query; // TODO: for infinite scroll

    const recipes = await Recipe.find({});
    res.status(200).json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Something went wrong" });
  }
}
