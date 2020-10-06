import React from "react";
import { Formik, Form, Field } from "formik";
import TextField from "@material-ui/core/TextField";

function AddRecipe() {
  return (
    <div>
      <Formik initialValues={{ title: "" }}>
        {() => (
          <Form>
            <Field name="title">
              {({ field }) => <TextField label="Title" as={TextField} fullWidth variant="filled" {...field} />}
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddRecipe;
