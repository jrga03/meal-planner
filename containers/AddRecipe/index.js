import React, { useState, useRef } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import PhotoIcon from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import CameraIcon from "@material-ui/icons/AddAPhoto";
import GalleryIcon from "@material-ui/icons/PhotoLibrary";

import { INITIAL_VALUES, PREP_TIME_OPTIONS, MAIN_INGREDIENT_OPTIONS, TAGS_OPTIONS } from "./constants";
import {
  photoStyles,
  genericFieldStyles,
  ingredientUnitStyles,
  ingredientInputStyles,
  dividerStyles,
  sectionTitleStyles,
  chipStyles,
  TextFieldsContainer,
  TwoColumns,
  IngredientRow,
  PrepNoteRow,
  TagsContainer,
  StyledCardActionArea,
  StyledCardContent
} from "./styles";

function AddRecipe() {
  const photoClasses = photoStyles();
  const genericFieldClasses = genericFieldStyles();
  const ingredientUnitClasses = ingredientUnitStyles();
  const ingredientInputClasses = ingredientInputStyles();
  const dividerClasses = dividerStyles();
  const sectionTitleClasses = sectionTitleStyles();
  const chipClasses = chipStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const fileInputRef = useRef(null);
  // const fileCaptureRef = useRef(null);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleTakePhoto = (isCapture = false) => () => {
    setDrawerOpen(false);

    // const ref = isCapture ? fileCaptureRef : fileInputRef;
    if (fileInputRef && fileInputRef.current) {
      if (isCapture) {
        fileInputRef.current.capture = "";
      }
      fileInputRef.current.click();
    }
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={handleTakePhoto(true)}>
            <ListItemIcon>
              <CameraIcon />
            </ListItemIcon>
            <ListItemText primary="Take photo" />
          </ListItem>
          <ListItem button onClick={handleTakePhoto()}>
            <ListItemIcon>
              <GalleryIcon />
            </ListItemIcon>
            <ListItemText primary="Choose existing photo" />
          </ListItem>
        </List>
      </Drawer>
      <Formik initialValues={INITIAL_VALUES}>
        {({ values }) => (
          <Form>
            <Hidden implementation="css" xsUp>
              <input id="file-input" type="file" accept="image/png, image/jpeg" ref={fileInputRef} />
              {/* <input id="file-capture" type="file" accept="image/png, image/jpeg" capture ref={fileCaptureRef} /> */}
            </Hidden>
            <Card square elevation={0}>
              <StyledCardActionArea onClick={toggleDrawer(true)}>
                {values.photo && (
                  <>
                    <CardMedia
                      className={photoClasses.media}
                      component="img"
                      image={values.photo}
                      title="Recipe photo"
                    />
                    <CardMedia className={photoClasses.root} />
                  </>
                )}
                <StyledCardContent>
                  {!values.photo && (
                    <Avatar>
                      <PhotoIcon />
                    </Avatar>
                  )}
                  <Typography variant="button">{values.photo ? "Change" : "Add"} Photo</Typography>
                </StyledCardContent>
              </StyledCardActionArea>
            </Card>
            <TextFieldsContainer>
              <Field name="title">
                {({ field }) => (
                  <TextField
                    classes={genericFieldClasses}
                    id={field.name}
                    label="Title"
                    fullWidth
                    variant="filled"
                    {...field}
                  />
                )}
              </Field>
              <Field name="source">
                {({ field }) => (
                  <TextField
                    classes={genericFieldClasses}
                    id={field.name}
                    label="Source"
                    fullWidth
                    variant="filled"
                    {...field}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <TextField
                    classes={genericFieldClasses}
                    id={field.name}
                    label="Description"
                    fullWidth
                    multiline
                    rowsMax={4}
                    variant="filled"
                    {...field}
                  />
                )}
              </Field>
              <Divider classes={dividerClasses} />
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
              <Divider classes={dividerClasses} />
              <Typography classes={sectionTitleClasses} variant="h6">
                Ingredients
              </Typography>
              <IngredientRow>
                <Typography classes={ingredientUnitClasses} variant="body2">
                  Amount
                </Typography>
                <Typography classes={ingredientUnitClasses} variant="body2">
                  Unit
                </Typography>
                <Typography classes={ingredientUnitClasses} variant="body2">
                  Ingredient
                </Typography>
                <Typography classes={ingredientUnitClasses} variant="body2">
                  Note
                </Typography>
                <div />
              </IngredientRow>
              <FieldArray
                name="ingredients"
                render={({ push, remove }) => (
                  <>
                    {values.ingredients.length > 0 &&
                      values.ingredients.map((ingredient, index) => (
                        <IngredientRow key={index}>
                          <Field name={`ingredients.${index}.amount`}>
                            {({ field }) => (
                              <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                            )}
                          </Field>
                          <Field name={`ingredients.${index}.unit`}>
                            {({ field }) => (
                              <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                            )}
                          </Field>
                          <Field name={`ingredients.${index}.ingredient`}>
                            {({ field }) => (
                              <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                            )}
                          </Field>
                          <Field name={`ingredients.${index}.note`}>
                            {({ field }) => (
                              <FilledInput id={field.name} classes={ingredientInputClasses} margin="none" {...field} />
                            )}
                          </Field>
                          <IconButton size="small" disableRipple onClick={() => remove(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </IngredientRow>
                      ))}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        push({
                          amount: "",
                          unit: "",
                          ingredient: "",
                          note: ""
                        })
                      }
                    >
                      Add ingredient
                    </Button>
                  </>
                )}
              />
              <Divider classes={dividerClasses} />
              <Typography classes={sectionTitleClasses} variant="h6">
                Prep Notes
              </Typography>
              <FieldArray
                name="prep-notes"
                render={({ push, remove }) => (
                  <>
                    {values["prep-notes"].length > 0 &&
                      values["prep-notes"].map((prepNote, index) => (
                        <PrepNoteRow key={index}>
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
                          <IconButton
                            className="prep-note__button"
                            size="small"
                            disableRipple
                            onClick={() => remove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </PrepNoteRow>
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
              <Divider classes={dividerClasses} />
              <Field name="main-ingredient">
                {({ field }) => (
                  <TextField
                    id={field.name}
                    classes={genericFieldClasses}
                    label="Main Ingredient"
                    fullWidth
                    select
                    SelectProps={{ native: true }}
                    variant="filled"
                    {...field}
                  >
                    <option value="" />
                    {MAIN_INGREDIENT_OPTIONS.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </TextField>
                )}
              </Field>
              <FieldArray
                name="tags"
                render={({ push, remove }) => {
                  const handleDelete = (index) => () => remove(index);
                  const handleSelectTag = (event) => push(event.target.value);

                  return (
                    <>
                      <TextField
                        id="tag-selector"
                        classes={genericFieldClasses}
                        label="Tags"
                        fullWidth
                        select
                        SelectProps={{ native: true, displayEmpty: false }}
                        variant="filled"
                        value=""
                        onChange={handleSelectTag}
                      >
                        <option value="" />
                        {TAGS_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value} disabled={values.tags.includes(value)}>
                            {label}
                          </option>
                        ))}
                      </TextField>
                      <TagsContainer>
                        {values.tags.length > 0 &&
                          values.tags.map((tag, index) => (
                            <Chip
                              key={tag}
                              classes={chipClasses}
                              label={tag}
                              onDelete={handleDelete(index)}
                              color="secondary"
                              size="small"
                            />
                          ))}
                      </TagsContainer>
                    </>
                  );
                }}
              />
              <Divider classes={dividerClasses} />
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
            </TextFieldsContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AddRecipe;
