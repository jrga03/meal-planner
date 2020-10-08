import React from "react";
import { useFormikContext, Field, FieldArray } from "formik";
import FilledInput from "@material-ui/core/FilledInput";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ingredientUnitStyles,
  ingredientInputStyles,
  sectionTitleStyles,
  IngredientRow
} from "containers/AddRecipe/styles";

function Ingredients() {
  const ingredientUnitClasses = ingredientUnitStyles();
  const ingredientInputClasses = ingredientInputStyles();
  const sectionTitleClasses = sectionTitleStyles();
  const { values } = useFormikContext();

  return (
    <>
      <Typography classes={sectionTitleClasses} variant="h6">
        Ingredients
      </Typography>
      <IngredientRow>
        <Typography classes={ingredientUnitClasses} variant="body2">
          Amount
        </Typography>
        <Typography classes={ingredientUnitClasses} variant="body2">
          Unit
        </Typography>
        <Typography classes={ingredientUnitClasses} variant="body2">
          Ingredient
        </Typography>
        <Typography classes={ingredientUnitClasses} variant="body2">
          Note
        </Typography>
        <div />
      </IngredientRow>
      <FieldArray
        name="ingredients"
        render={({ push, remove }) => (
          <>
            {values.ingredients?.map((ingredient, index) => (
              <IngredientRow key={index}>
                <Field name={`ingredients.${index}.amount`}>
                  {({ field }) => (
                    <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                  )}
                </Field>
                <Field name={`ingredients.${index}.unit`}>
                  {({ field }) => (
                    <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                  )}
                </Field>
                <Field name={`ingredients.${index}.ingredient`}>
                  {({ field }) => (
                    <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                  )}
                </Field>
                <Field name={`ingredients.${index}.note`}>
                  {({ field }) => (
                    <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                  )}
                </Field>
                <IconButton size="small" disableRipple onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </IngredientRow>
            ))}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() =>
                push({
                  amount: "",
                  unit: "",
                  ingredient: "",
                  note: ""
                })
              }
            >
              Add ingredient
            </Button>
          </>
        )}
      />
    </>
  );
}

export default Ingredients;
