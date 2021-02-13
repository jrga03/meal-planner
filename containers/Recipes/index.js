import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";

// Utilities
import Fetch from "utils/request";

// Components
import PageWrapper from "components/PageWrapper";
import RecipeList from "components/RecipeList";

// Providers
import AddRecipeDialogProvider from "containers/AddRecipe/AddRecipeDialog";

import { Wrapper } from "containers/Recipes/styles";

function Recipes({ recipes }) {
  const { data, error } = useSWR("/api/recipes", Fetch, { initialData: { recipes } });

  return (
    <AddRecipeDialogProvider>
      <PageWrapper maxWidth={ false }>
        <Wrapper>
          <RecipeList recipes={ data?.recipes } loading={ !data && !error } />
        </Wrapper>
      </PageWrapper>
    </AddRecipeDialogProvider>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      photo: PropTypes.string
    })
  )
};

Recipes.defaultProps = {
  recipes: []
};

export default Recipes;
