import React from "react";
import { useFormikContext, Field, FieldArray } from "formik";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { PREP_TIME_OPTIONS } from "containers/AddRecipe/constants";
import { genericFieldStyles, sectionTitleStyles, PrepNoteGrid } from "containers/AddRecipe/styles";

function PrepNotes() {
  const genericFieldClasses = genericFieldStyles();
  const sectionTitleClasses = sectionTitleStyles();
  const { values } = useFormikContext();

  return (
    <>
      <Typography classes={sectionTitleClasses} variant="h6">
        Prep Notes
      </Typography>
      <FieldArray
        name="prep-notes"
        render={({ push, remove }) => (
          <>
            {values["prep-notes"]?.map((prepNote, index) => (
              <PrepNoteGrid key={index}>
                <Field name={`["prep-notes"].${index}.time`}>
                  {({ field }) => (
                    <TextField
                      id={field.name}
                      classes={genericFieldClasses}
                      className="prep-note__time"
                      label="Start preparing"
                      select
                      SelectProps={{ native: true }}
                      variant="filled"
                      {...field}
                    >
                      {PREP_TIME_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </TextField>
                  )}
                </Field>
                <Field name={`["prep-notes"].${index}.note`}>
                  {({ field }) => (
                    <TextField
                      id={field.name}
                      classes={genericFieldClasses}
                      className="prep-note__note"
                      label="Prep note"
                      multiline
                      rows={2}
                      rowsMax={2}
                      variant="filled"
                      {...field}
                    />
                  )}
                </Field>
                <div className="prep-note__button">
                  <IconButton size="small" disableRipple onClick={() => remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </PrepNoteGrid>
            ))}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() =>
                push({
                  time: 1,
                  note: ""
                })
              }
            >
              Add Prep Note
            </Button>
          </>
        )}
      />
    </>
  );
}

export default PrepNotes;
