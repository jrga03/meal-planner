import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { sectionTitleStyles, TwoColumns } from "containers/AddRecipe/styles";

function PrepTimes() {
  const sectionTitleClasses = sectionTitleStyles();

  return (
    <>
      <Typography classes={sectionTitleClasses} variant="h6">
        Prep Time
      </Typography>
      <TwoColumns>
        <Field name="prep-hours">
          {({ field }) => <TextField id={field.name} label="Hours" variant="filled" {...field} />}
        </Field>
        <Field name="prep-minutes">
          {({ field }) => <TextField id={field.name} label="Minutes" variant="filled" {...field} />}
        </Field>
      </TwoColumns>
      <Typography classes={sectionTitleClasses} variant="h6">
        Cook Time
      </Typography>
      <TwoColumns>
        <Field name="cook-hours">
          {({ field }) => <TextField id={field.name} label="Hours" variant="filled" {...field} />}
        </Field>
        <Field name="cook-minutes">
          {({ field }) => <TextField id={field.name} label="Minutes" variant="filled" {...field} />}
        </Field>
      </TwoColumns>
    </>
  );
}

export default PrepTimes;
