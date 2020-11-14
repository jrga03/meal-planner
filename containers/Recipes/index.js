import React from "react";
import useSWR from "swr";

// Utilities
import Fetch from "utils/request";

// Components
import PageWrapper from "components/PageWrapper";
import RecipeList from "components/RecipeList";

// Providers
import AddRecipeDialogProvider from "containers/AddRecipe/AddRecipeDialog";

import { Wrapper } from "containers/Recipes/styles";

function Recipes() {
  const { data, error } = useSWR("/api/recipes?hello=world", Fetch);

  return (
    <AddRecipeDialogProvider>
      <PageWrapper>
        <Wrapper>
          <RecipeList recipes={ data?.recipes } loading={ !data && !error } />
        </Wrapper>
      </PageWrapper>
    </AddRecipeDialogProvider>
  );
}

export default Recipes;
