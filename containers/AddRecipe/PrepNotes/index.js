import React from "react";
import { useFormikContext, Field, FieldArray } from "formik";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { PREP_TIME_OPTIONS } from "containers/AddRecipe/constants";
import { PrepNoteGrid, SectionTitle, GenericTextField } from "containers/AddRecipe/styles";

function PrepNotes() {
  const { values } = useFormikContext();

  return (
    <>
      <SectionTitle variant="h6">Prep Notes</SectionTitle>
      <FieldArray
        name="prep-notes"
        render={ ({ push, remove }) => (
          <>
            {values["prep-notes"]?.map((prepNote, index) => (
              <PrepNoteGrid key={ index }>
                <Field name={ `["prep-notes"].${index}.time` }>
                  {({ field }) => (
                    <GenericTextField
                      id={ field.name }
                      className="prep-note__time"
                      label="Start preparing"
                      select
                      SelectProps={ { native: true } }
                      variant="filled"
                      { ...field }
                    >
                      {PREP_TIME_OPTIONS.map(({ value, label }) => (
                        <option key={ value } value={ value }>
                          {label}
                        </option>
                      ))}
                    </GenericTextField>
                  )}
                </Field>
                <Field name={ `["prep-notes"].${index}.note` }>
                  {({ field }) => (
                    <GenericTextField
                      id={ field.name }
                      className="prep-note__note"
                      label="Prep note"
                      multiline
                      rows={ 2 }
                      rowsMax={ 2 }
                      variant="filled"
                      { ...field }
                    />
                  )}
                </Field>
                <div className="prep-note__button">
                  <IconButton size="small" disableRipple onClick={ () => remove(index) }>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </PrepNoteGrid>
            ))}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={ () =>
                push({
                  time: 1,
                  note: ""
                })
              }
            >
              Add Prep Note
            </Button>
          </>
        ) }
      />
    </>
  );
}

export default PrepNotes;
