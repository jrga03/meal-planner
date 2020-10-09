import React, { useState, useRef } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import PhotoIcon from "@material-ui/icons/PhotoCamera";
import CameraIcon from "@material-ui/icons/AddAPhoto";
import GalleryIcon from "@material-ui/icons/PhotoLibrary";
import { isMobile } from "react-device-detect";

import { fileToBase64Img } from "utils/fileHelper";
import { INITIAL_VALUES, MAIN_INGREDIENT_OPTIONS, TAGS_OPTIONS } from "containers/AddRecipe/constants";
import {
  photoStyles,
  genericFieldStyles,
  dividerStyles,
  chipStyles,
  TextFieldsContainer,
  TagsContainer,
  StyledCardActionArea,
  StyledCardContent,
  PhotoOverlay
} from "containers/AddRecipe/styles";

import PrepTimes from "containers/AddRecipe/PrepTimes";
import Ingredients from "containers/AddRecipe/Ingredients";
import PrepNotes from "containers/AddRecipe/PrepNotes";
import Directions from "containers/AddRecipe/Directions";

function AddRecipe() {
  const photoClasses = photoStyles();
  const genericFieldClasses = genericFieldStyles();
  const dividerClasses = dividerStyles();
  const chipClasses = chipStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recipePhoto, setRecipePhoto] = useState(null);

  const fileInputRef = useRef(null);
  const fileCaptureRef = useRef(null);

  const toggleDrawer = (open) => (event) => {
    if (open && !isMobile && fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
      return;
    }

    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleTakePhoto = (isCapture = false) => () => {
    setDrawerOpen(false);

    const ref = isCapture ? fileCaptureRef : fileInputRef;
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  const handleInputChange = async (event) => {
    const file = event?.target?.files?.[0];
    let image = null;

    if (file) {
      image = await fileToBase64Img(file);
    }

    setRecipePhoto(image);
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
              <input
                id="file-input"
                type="file"
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={handleInputChange}
              />
              <input
                id="file-capture"
                type="file"
                accept="image/png, image/jpeg"
                capture
                ref={fileCaptureRef}
                onChange={handleInputChange}
              />
            </Hidden>
            <Card square elevation={0}>
              <StyledCardActionArea onClick={toggleDrawer(true)}>
                {recipePhoto && (
                  <>
                    <CardMedia
                      className={photoClasses.media}
                      component="img"
                      image={recipePhoto}
                      title="Recipe photo"
                    />
                    <PhotoOverlay />
                  </>
                )}
                <StyledCardContent>
                  {!recipePhoto && (
                    <Avatar>
                      <PhotoIcon />
                    </Avatar>
                  )}
                  <Typography variant="button">{recipePhoto ? "Change" : "Add"} Photo</Typography>
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

              <PrepTimes />
              <Divider classes={dividerClasses} />

              <Ingredients />
              <Divider classes={dividerClasses} />

              <PrepNotes />
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
                        {values.tags?.map((tag, index) => (
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

              <Directions />
            </TextFieldsContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AddRecipe;
