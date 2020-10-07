import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

function clampHeight(theme) {
  return `clamp(0px, ${100 * (9 / 16)}vw, ${theme.breakpoints.values.sm * (9 / 16)}px)`;
}

export const photoStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: `clamp(0px, 100%, ${theme.breakpoints.values.sm}px)`,
    height: clampHeight(theme),
    background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)",
    top: 0
  },
  media: {
    height: clampHeight(theme)
  }
}));

export const genericFieldStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}));

export const ingredientUnitStyles = makeStyles(() => ({
  root: {
    fontSize: "0.75rem"
  }
}));

export const ingredientInputStyles = makeStyles(() => ({
  input: {
    padding: "4px",
    fontSize: "0.75rem"
  }
}));

export const dividerStyles = makeStyles(() => ({
  root: {
    margin: "16px 0"
  }
}));

export const sectionTitleStyles = makeStyles(() => ({
  root: {
    margin: "12px 0 4px"
  }
}));

export const chipStyles = makeStyles(() => ({
  root: {
    marginRight: "4px",
    marginBottom: "4px"
  }
}));

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
  grid-template-columns: 5fr 5fr 10fr 10fr 2fr;
  column-gap: 4px;
  margin-bottom: 6px;
`;

export const PrepNoteRow = styled.div`
  margin-bottom: 6px;
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: auto;
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
  min-height: 40vw;
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
