import React, { useState, useEffect, forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { FixedSizeList as List, areEqual } from "react-window";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

import { LoaderWrapper } from "pages/_app";
import RecipeCard from "components/RecipeCard";
import { RECIPE_CARD_GUTTER_SIZE } from "components/RecipeCard/styles";
import { useWindowSize, useHeaderHeight } from "utils/hooks";

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
function RecipeList({ recipes }) {
  const windowSize = useWindowSize();
  const headerHeight = useHeaderHeight();

  const [listHeight, setListHeight] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    setListHeight(windowSize.height - headerHeight);
    setItemWidth(Math.min(windowSize.width, 600) - RECIPE_CARD_GUTTER_SIZE * 2);
  }, [windowSize, headerHeight]);

  const computedItemHeight = itemWidth * 0.2;
  const itemHeight = Math.min(Math.max(computedItemHeight, 75), 120); // Clamp itemSize

  /**
   * Fetches ID for list item
   * @param {number} index - Item index
   * @param {object[]} data - Item list
   */
  function getKey(index, recipes) {
    return recipes[index].id;
  }

  return recipes.length === 0 ? (
    <LoaderWrapper>
      <Typography component="h1" variant="h5">
        No recipes available
      </Typography>
    </LoaderWrapper>
  ) : (
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
      id: PropTypes.string,
      name: PropTypes.string,
      photo: PropTypes.string
    })
  ).isRequired
};

export default RecipeList;
