import connectToDatabase from "utils/connectToDb";
import Recipe from "models/Recipe";

connectToDatabase();

export default async function(req, res) {
  try {
    const { id } = req.query;

    const recipe = await Recipe.findById(id);
    if (recipe) {
      res.status(200).json( recipe );
    } else {
      res.status(404).json({ message: "Not found" })
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Something went wrong" });
  }
}
