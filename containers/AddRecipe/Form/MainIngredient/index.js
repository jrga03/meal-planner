import React from "react";
import { Field, useFormikContext } from "formik";

import { MAIN_INGREDIENT_OPTIONS } from "containers/AddRecipe/constants";
import { GenericTextField } from "containers/AddRecipe/styles";

function MainIngredient() {
  const { errors } = useFormikContext();

  return (
    <Field name="main-ingredient">
      {({ field }) => (
        <GenericTextField
          id={ field.name }
          label="Category"
          fullWidth
          select
          SelectProps={ { native: true } }
          variant="filled"
          error={ !!errors[field.name] }
          helperText={ errors[field.name] || "" }
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
