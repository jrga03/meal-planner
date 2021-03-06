import React, { useState, useEffect, forwardRef, memo, useContext } from "react";
import PropTypes from "prop-types";
import { FixedSizeList as List, areEqual } from "react-window";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { isMobileOnly } from "react-device-detect";

import { LoaderWrapper } from "pages/_app";
import RecipeCard from "components/RecipeCard";
import { RECIPE_CARD_GUTTER_SIZE, SkeletonRecipeCard } from "components/RecipeCard/styles";
import { useWindowSize, useHeaderHeight } from "utils/hooks";

import { AddRecipeDialogContext } from "containers/AddRecipe/AddRecipeDialog"

const MemoizedRecipeCardItem = memo(RecipeCard, areEqual);

/* eslint-disable react/prop-types */
const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ ref }
    style={ {
      ...style,
      height: `${parseFloat(style.height) + RECIPE_CARD_GUTTER_SIZE * 2}px`
    } }
    { ...rest }
  />
));
/* eslint-enable react/prop-types */

/**
 * RecipeList component
 */
function RecipeList({ recipes, loading }) {
  const { handleAddRecipe } = useContext(AddRecipeDialogContext);
  const windowSize = useWindowSize();
  const headerHeight = useHeaderHeight();
  const footerHeight = isMobileOnly ? 0 : 52;

  const [listHeight, setListHeight] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    setListHeight(windowSize.height - headerHeight - footerHeight);
    setItemWidth(Math.min(windowSize.width, 600) - RECIPE_CARD_GUTTER_SIZE * 2);
  }, [windowSize, headerHeight, footerHeight]);

  const computedItemHeight = itemWidth * 0.2;
  const itemHeight = Math.min(Math.max(computedItemHeight, 75), 120); // Clamp itemSize

  /**
   * Fetches ID for list item
   * @param {number} index - Item index
   * @param {object[]} data - Item list
   */
  function getKey(index, recipes) {
    return recipes[index]._id;
  }

  if (loading) {
    return (
      <>
        <SkeletonRecipeCard variant="rect" width={ itemWidth } height={ itemHeight } />
        <SkeletonRecipeCard variant="rect" width={ itemWidth } height={ itemHeight } />
        <SkeletonRecipeCard variant="rect" width={ itemWidth } height={ itemHeight } />
        <SkeletonRecipeCard variant="rect" width={ itemWidth } height={ itemHeight } />
      </>
    );
  }

  if (recipes.length === 0) {
    return (
      <LoaderWrapper>
        <Typography component="h1" variant="h5" gutterBottom>
          No recipes available
        </Typography>
        <Button variant="contained" onClick={ handleAddRecipe }>
          Add Recipe
        </Button>
      </LoaderWrapper>
    );
  }

  return (
    <Fade in>
      <List
        height={ listHeight }
        width={ windowSize.width }
        itemCount={ recipes.length }
        itemSize={ itemHeight }
        itemData={ recipes }
        itemKey={ getKey }
        innerElementType={ innerElementType }
      >
        {({ data, index, style }) => {
          const item = data[index];
          return (
            <MemoizedRecipeCardItem
              { ...item }
              style={ {
                ...style,
                top: style.top + RECIPE_CARD_GUTTER_SIZE,
                height: style.height - RECIPE_CARD_GUTTER_SIZE,
                left: style.left + (windowSize.width - itemWidth) / 2,
                width: itemWidth
              } }
            />
          );
        }}
      </List>
    </Fade>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      photo: PropTypes.string
    })
  ),
  loading: PropTypes.bool.isRequired
};

RecipeList.defaultProps = {
  recipes: []
};

export default RecipeList;
