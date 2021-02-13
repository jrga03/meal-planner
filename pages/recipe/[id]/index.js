import RecipePage from "containers/Recipe";
import connectToDatabase from "utils/connectToDb";
import Recipe from "models/Recipe";

export async function getStaticPaths() {
  connectToDatabase();

  let recipes;
  try {
    const response = await Recipe.find({}).lean();

    recipes = JSON.parse(JSON.stringify(response))
  } catch (error) {
    recipes = [];
  }

  const paths = recipes.map(({ _id: id }) => ({
    params: { id }
  }))

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  connectToDatabase();

  let recipe;
  try {
    const { id } = params
    const response = await Recipe.findById(id);

    recipe = JSON.parse(JSON.stringify(response))
  } catch (error) {
    // Do nothing
  }

  return {
    props: { recipe },
    revalidate: 60
  };
}

export default RecipePage;
