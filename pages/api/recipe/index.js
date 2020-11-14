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

    switch (req.method) {
      case "POST": {
        const recipe = await new Recipe(data).save();
        res.status(200).json({ id: recipe._id });
        break;
      }
      case "PUT": {
        if (!data.payload || typeof data.payload !== "object") {
          res.status(406).json({ message: "Request body must be in JSON format" });
          return;
        }

        await Recipe.findByIdAndUpdate(data.id, data.payload, { overwrite: true });
        res.status(200).json({});
        break;
      }
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Something went wrong" });
  }
});
