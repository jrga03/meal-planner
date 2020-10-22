import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";

import { TwoColumns, SectionTitle } from "containers/AddRecipe/styles";

function PrepTimes() {
  return (
    <>
      <SectionTitle variant="h6">Prep Time</SectionTitle>
      <TwoColumns>
        <Field name="prep-hours">
          {({ field }) => <TextField id={ field.name } label="Hours" variant="filled" { ...field } />}
        </Field>
        <Field name="prep-minutes">
          {({ field }) => <TextField id={ field.name } label="Minutes" variant="filled" { ...field } />}
        </Field>
      </TwoColumns>
      <SectionTitle variant="h6">Cook Time</SectionTitle>
      <TwoColumns>
        <Field name="cook-hours">
          {({ field }) => <TextField id={ field.name } label="Hours" variant="filled" { ...field } />}
        </Field>
        <Field name="cook-minutes">
          {({ field }) => <TextField id={ field.name } label="Minutes" variant="filled" { ...field } />}
        </Field>
      </TwoColumns>
    </>
  );
}

export default PrepTimes;
