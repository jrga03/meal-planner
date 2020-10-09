import React from "react";
import { Field } from "formik";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { genericFieldStyles, sectionTitleStyles } from "containers/AddRecipe/styles";

function Directions() {
  const genericFieldClasses = genericFieldStyles();
  const sectionTitleClasses = sectionTitleStyles();

  return (
    <>
      <Typography classes={sectionTitleClasses} variant="h6">
        Directions
      </Typography>
      <Field name="directions">
        {({ field }) => (
          <TextField
            classes={genericFieldClasses}
            id={field.name}
            label="Directions"
            fullWidth
            multiline
            rows={6}
            variant="filled"
            {...field}
          />
        )}
      </Field>
    </>
  );
}

export default Directions;
