import auth0 from "utils/auth0";
import connectToDatabase from "utils/connectToDb";
import Recipe from "models/Recipe";

connectToDatabase();

export default auth0.requireAuthentication(async function saveRecipe(req, res) {
  try {
    if (!req.body) {
      res.status(406).json({ message: "Request body required" });
      return;
    }

    const data = JSON.parse(req.body);
    if (!data || typeof data !== "object") {
      res.status(406).json({ message: "Request body must be in JSON format" });
      return;
    }

    const recipe = await new Recipe(data).save();
    res.status(200).json({ id: recipe._id });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Something went wrong" });
  }
});
