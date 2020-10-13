import React from "react";
import { Field } from "formik";
import { SectionTitle, GenericTextField } from "containers/AddRecipe/styles";

function Directions() {
  return (
    <>
      <SectionTitle variant="h6">Directions</SectionTitle>
      <Field name="directions">
        {({ field }) => (
          <GenericTextField
            id={ field.name }
            label="Directions"
            fullWidth
            multiline
            rows={ 6 }
            rowsMax={ 20 }
            variant="filled"
            { ...field }
          />
        )}
      </Field>
    </>
  );
}

export default Directions;
