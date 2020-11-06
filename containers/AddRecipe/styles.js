import styled from "styled-components";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";

export function clampHeight(theme) {
  return `clamp(0px, ${100 * (9 / 16)}vw, ${theme.breakpoints.values.sm * (9 / 16)}px)`;
}

export const TextFieldsContainer = styled.main`
  width: 100%;
  padding: 8px 4px;
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4px;
  margin-bottom: 8px;
`;

export const IngredientRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr 10fr 10fr min-content;
  column-gap: 4px;
  margin-bottom: 6px;
`;

export const PrepNoteGrid = styled.div`
  margin-bottom: 6px;
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: auto;
  align-items: center;
  grid-template-areas:
    "time button"
    "note button";

  .prep-note__button {
    grid-area: button;
  }

  .prep-note__time {
    grid-area: time;
  }

  .prep-note__note {
    grid-area: note;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledCardActionArea = styled(CardActionArea)`
  position: relative;
  min-height: ${({ theme }) => clampHeight(theme)};
`;

export const StyledCardContent = styled(CardContent)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  row-gap: 10px;
  justify-items: center;
`;

export const PhotoOverlay = styled.div`
  position: absolute;
  width: ${({ theme }) => `clamp(0px, 100%, ${theme.breakpoints.values.sm}px)`};
  height: ${({ theme }) => clampHeight(theme)};
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.7) 100%);
  top: 0;
`;

export const SectionTitle = styled(Typography)`
  margin: 12px 0 4px;
`;

const ingredientFontSize = "0.75rem";

export const IngredientUnitTitle = styled(Typography)`
  font-size: ${ingredientFontSize};
`;

export const IngredientInput = styled(FilledInput)`
  padding: 4px;
  font-size: ${ingredientFontSize};

  .MuiFilledInput-input {
    padding: ${({ theme }) => theme.spacing(1)}px;
  }
`;

export const StyledDivider = styled(Divider)`
  margin: 16px 0;
`;

export const GenericTextField = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

export const RecipePhoto = styled(CardMedia)`
  height: ${({ theme }) => clampHeight(theme)};
`;

export const Tag = styled(Chip)`
  margin-right: 4px;
  margin-bottom: 4px;
  text-transform: capitalize;
`;

export const SkeletonPhoto = styled(Skeleton)`
  height: ${({ theme }) => clampHeight(theme)};
`;

export const SkeletonField = styled(Skeleton)`
  height: 56px;
  margin: 4px;
  margin-top: 8px;
`;

export const SkeletonDivider = styled(Skeleton)`
  height: 1px;
  margin: 16px 0;
`;
