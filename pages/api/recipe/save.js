import auth0 from "utils/auth0";
import { connectToDatabase } from "utils/mongodb";

export default auth0.requireAuthentication(async function saveRecipe(req, res) {
  try {
    if (!req.body) {
      res.status(406).end("Request body required");
      return;
    }

    const data = JSON.parse(req.body);
    if (!data || typeof data !== "object") {
      res.status(406).end("Request body must be in JSON format");
      return;
    }

    const { db } = await connectToDatabase();
    await db
      .collection("recipes")
      .insertOne(data)
      .then((result) => {
        res.status(200).json({ id: result.insertedId });
      });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
});
