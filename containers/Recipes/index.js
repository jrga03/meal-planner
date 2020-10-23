import React from "react";
import useSWR from "swr";

// Utilities
import Fetch from "utils/request";

// Components
import PageWrapper from "components/PageWrapper";
import RecipeList from "components/RecipeList";

import { Wrapper } from "containers/Recipes/styles";

function Recipes() {
  const { data } = useSWR("/api/recipes?hello=world", Fetch);

  return (
    <PageWrapper>
      <Wrapper>
        <RecipeList recipes={ data?.recipes } loading={ !data } />
      </Wrapper>
    </PageWrapper>
  );
}

export default Recipes;
