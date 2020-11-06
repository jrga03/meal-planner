import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";

import { getCloudinaryImageUrl } from "utils/cloudinary";

import { StyledLink, StyledCard, StyledCardMedia, StyledCardContent, RecipeTitle, PhotoPlaceholder } from "./styles";

function RecipeCard({ _id, title, photo, style }) {
  const thumbnail = getCloudinaryImageUrl(photo, true);

  return (
    <Link href={ `/recipe/${_id}` } passHref>
      <StyledCard style={ style } component={ StyledLink }>
        {thumbnail ? (
          <StyledCardMedia image={ thumbnail } title={ title } $height={ style.height } />
        ) : (
          <PhotoPlaceholder $height={ style.height }>
            <Typography variant="caption" color="textSecondary">
              NO PHOTO
            </Typography>
          </PhotoPlaceholder>
        )}
        <StyledCardContent>
          <RecipeTitle component="span" variant="body1" color="textPrimary">
            {title}
          </RecipeTitle>
        </StyledCardContent>
      </StyledCard>
    </Link>
  );
}

RecipeCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string,
  style: PropTypes.object.isRequired
};

RecipeCard.defaultProps = {
  photo: ""
};

export default RecipeCard;
