import Recipes from "containers/Recipes";
import connectToDatabase from "utils/connectToDb";
import Recipe from "models/Recipe";

export async function getStaticProps() {
  connectToDatabase();

  let recipes;
  try {
    const response = await Recipe.find({}).lean();

    recipes = JSON.parse(JSON.stringify(response))
  } catch (error) {
    recipes = [];
  }

  return {
    props: { recipes },
    revalidate: 60
  };
}

export default Recipes;
