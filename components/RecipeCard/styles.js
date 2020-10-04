import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export const RECIPE_CARD_GUTTER_SIZE = 4;

export const StyledLink = styled.a`
  text-decoration: none;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  display: flex;
  margin-bottom: 0;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 20%;
  object-fit: cover;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  max-width: calc(80% - 32px);

  &&:last-child {
    padding-bottom: 16px;
  }
`;

export const RecipeTitle = styled(Typography)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
