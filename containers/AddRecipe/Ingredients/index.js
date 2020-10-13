import React from "react";
import { useFormikContext, Field, FieldArray } from "formik";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { IngredientRow, SectionTitle, IngredientUnitTitle, IngredientInput } from "containers/AddRecipe/styles";

function Ingredients() {
  const { values } = useFormikContext();

  return (
    <>
      <SectionTitle variant="h6">Ingredients</SectionTitle>
      <IngredientRow>
        <IngredientUnitTitle variant="body2">Amount</IngredientUnitTitle>
        <IngredientUnitTitle variant="body2">Unit</IngredientUnitTitle>
        <IngredientUnitTitle variant="body2">Ingredient</IngredientUnitTitle>
        <IngredientUnitTitle variant="body2">Note</IngredientUnitTitle>
        <div />
      </IngredientRow>
      <FieldArray
        name="ingredients"
        render={ ({ push, remove }) => (
          <>
            {values.ingredients?.map((ingredient, index) => (
              <IngredientRow key={ index }>
                <Field name={ `ingredients.${index}.amount` }>
                  {({ field }) => <IngredientInput id={ field.name } margin="none" { ...field } />}
                </Field>
                <Field name={ `ingredients.${index}.unit` }>
                  {({ field }) => <IngredientInput id={ field.name } margin="none" { ...field } />}
                </Field>
                <Field name={ `ingredients.${index}.ingredient` }>
                  {({ field }) => <IngredientInput id={ field.name } margin="none" { ...field } />}
                </Field>
                <Field name={ `ingredients.${index}.note` }>
                  {({ field }) => <IngredientInput id={ field.name } margin="none" { ...field } />}
                </Field>
                <IconButton size="small" disableRipple onClick={ () => remove(index) }>
                  <DeleteIcon />
                </IconButton>
              </IngredientRow>
            ))}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={ () =>
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
        ) }
      />
    </>
  );
}

export default Ingredients;
