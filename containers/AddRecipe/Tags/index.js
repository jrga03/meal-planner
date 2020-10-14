import React from "react";
import { useFormikContext, FieldArray } from "formik";

import { TAGS_OPTIONS } from "containers/AddRecipe/constants";
import { GenericTextField, TagsContainer, Tag } from "containers/AddRecipe/styles";

function Tags() {
  const { values } = useFormikContext();

  return (
    <FieldArray
      name="tags"
      render={ ({ push, remove }) => {
        const handleDelete = (index) => () => remove(index);
        const handleSelectTag = (event) => push(event.target.value);

        return (
          <>
            <GenericTextField
              id="tag-selector"
              label="Tags"
              fullWidth
              select
              SelectProps={ { native: true, displayEmpty: false } }
              variant="filled"
              value=""
              onChange={ handleSelectTag }
            >
              <option value="" />
              {TAGS_OPTIONS.map(({ value, label }) => (
                <option key={ value } value={ value } disabled={ values.tags.includes(value) }>
                  {label}
                </option>
              ))}
            </GenericTextField>
            <TagsContainer>
              {values.tags?.map((tag, index) => (
                <Tag key={ tag } label={ tag } onDelete={ handleDelete(index) } color="secondary" size="small" />
              ))}
            </TagsContainer>
          </>
        );
      } }
    />
  );
}

export default Tags;
