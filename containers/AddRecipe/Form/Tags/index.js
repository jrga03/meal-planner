import React, { useState } from "react";
import { useFormikContext, FieldArray } from "formik";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";

import { TAGS_OPTIONS } from "containers/AddRecipe/constants";
import { GenericTextField, Tag } from "containers/AddRecipe/styles";

const filter = createFilterOptions();

function Tags() {
  const { values, setFieldValue } = useFormikContext();
  const [value, setValue] = useState([]);

  return (
    <FieldArray
      name="tags"
      render={ () => (
        <Autocomplete
          id="free-solo-tags"
          value={ value }
          onChange={ (event, newValues) => {
            console.log("onChange", newValues);
            setValue(newValues);
            const tags = newValues.map((tag) => {
              if (typeof tag === "string") {
                return tag.toLowerCase();
              }

              return tag?.inputValue?.toLowerCase();
            });
            setFieldValue("tags", tags);
          } }
          filterOptions={ (options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`
              });
            }

            return filtered;
          } }
          blurOnSelect
          selectOnFocus
          clearOnBlur
          clearOnEscape
          handleHomeEndKeys
          multiple
          disableClearable
          freeSolo
          options={ TAGS_OPTIONS }
          getOptionLabel={ (option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option?.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option?.title;
          } }
          getOptionDisabled={ (option) => values.tags.indexOf(option) > -1 }
          renderOption={ (option) => {
            if (typeof option === "string") {
              return option;
            }
            return option.title;
          } }
          renderInput={ (params) => <GenericTextField { ...params } label="Tags" variant="filled" /> }
          renderTags={ (value, getTagProps) =>
            value.map((option, index) => (
              <Tag
                key={ option }
                label={ option?.inputValue || option }
                size="small"
                variant="outlined"
                { ...getTagProps({ index }) }
              />
            ))
          }
        />
      ) }
    />
  );
}

export default Tags;
