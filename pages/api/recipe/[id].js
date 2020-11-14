import connectToDatabase from "utils/connectToDb";
import Recipe from "models/Recipe";

connectToDatabase();

export default async function (req, res) {
  try {
    const { id } = req.query;

    switch (req.method) {
      case "GET": {
        const recipe = await Recipe.findById(id);

        if (recipe) {
          res.status(200).json(recipe);
        } else {
          res.status(404).json({ message: "Not found" });
        }
        break;
      }
      case "PUT": {
        if (!req.body) {
          res.status(406).json({ message: "Request body required" });
          return;
        }

        try {
          const data = JSON.parse(req.body);
          if (!data || typeof data !== "object" || !data.payload || typeof data.payload !== "object") {
            res.status(406).json({ message: "Request body must be in JSON format" });
            return;
          }

          await Recipe.findByIdAndUpdate(id, data.payload, { overwrite: true });
          res.status(200).json({});
        } catch {
          res.status(406).json({ message: "Request body must be in JSON format" });
        }

        break;
      }
      case "DELETE": {
        if (!id) {
          res.status(406).json({ message: "Recipe ID is required" });
          return;
        }

        await Recipe.findByIdAndDelete(id)
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
}
