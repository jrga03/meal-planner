import React from "react";
import { Field } from "formik";

import { MAIN_INGREDIENT_OPTIONS } from "containers/AddRecipe/constants";
import { GenericTextField } from "containers/AddRecipe/styles";

function MainIngredient() {
  return (
    <Field name="main-ingredient">
      {({ field }) => (
        <GenericTextField
          id={ field.name }
          label="Main Ingredient"
          fullWidth
          select
          SelectProps={ { native: true } }
          variant="filled"
          { ...field }
        >
          <option value="" />
          {MAIN_INGREDIENT_OPTIONS.map(({ value, label }) => (
            <option key={ value } value={ value }>
              {label}
            </option>
          ))}
        </GenericTextField>
      )}
    </Field>
  );
}

export default MainIngredient;
