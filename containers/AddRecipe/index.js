import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import PhotoIcon from "@material-ui/icons/PhotoCamera";
import CameraIcon from "@material-ui/icons/AddAPhoto";
import GalleryIcon from "@material-ui/icons/PhotoLibrary";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { isMobileOnly, isMobile, isIOS } from "react-device-detect";

import { fileToBase64Img } from "utils/fileHelper";
import WithHeader from "containers/Header/withHeader";
import { INITIAL_VALUES, MAIN_INGREDIENT_OPTIONS, TAGS_OPTIONS } from "containers/AddRecipe/constants";
import {
  TextFieldsContainer,
  TagsContainer,
  StyledCardActionArea,
  StyledCardContent,
  PhotoOverlay,
  StyledDivider,
  GenericTextField,
  RecipePhoto,
  Tag
} from "containers/AddRecipe/styles";
import PrepTimes from "containers/AddRecipe/PrepTimes";
import Ingredients from "containers/AddRecipe/Ingredients";
import PrepNotes from "containers/AddRecipe/PrepNotes";
import Directions from "containers/AddRecipe/Directions";

import { usePreventRouteChangeIf } from "utils/hooks";

function FormikContent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recipePhoto, setRecipePhoto] = useState(null);

  const fileInputRef = useRef(null);
  const fileCaptureRef = useRef(null);

  const router = useRouter();
  const { values, submitForm, dirty } = useFormikContext();
  usePreventRouteChangeIf(dirty, () => alert("form is dirty")); // TODO: Maybe check for a custom status

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

  const handleBack = () => {
    if (dirty) {
      // TODO: Show confirm
      alert("Form is dirty");
    } else {
      router.back("/");
    }
  };

  const handleSave = () => submitForm();

  return (
    <WithHeader
      HeaderProps={ {
        title: "Add Recipe",
        startNode: (
          <IconButton edge="start" color="inherit" aria-label="Menu" onClick={ handleBack }>
            {isIOS ? <ArrowBackIosIcon /> : <ArrowBackIcon />}
          </IconButton>
        ),
        endNode: (
          <Button color="secondary" variant="contained" disableElevation size="small" onClick={ handleSave }>
            Save
          </Button>
        )
      } }
      content={
        <Container maxWidth="sm" disableGutters>
          <Drawer anchor="bottom" open={ drawerOpen } onClose={ toggleDrawer(false) }>
            <List>
              <ListItem button onClick={ handleTakePhoto(true) }>
                <ListItemIcon>
                  <CameraIcon />
                </ListItemIcon>
                <ListItemText primary="Take photo" />
              </ListItem>
              <ListItem button onClick={ handleTakePhoto() }>
                <ListItemIcon>
                  <GalleryIcon />
                </ListItemIcon>
                <ListItemText primary="Choose existing photo" />
              </ListItem>
            </List>
          </Drawer>
          <Form>
            <Hidden implementation="css" xsUp>
              <input
                id="file-input"
                type="file"
                accept="image/png, image/jpeg"
                ref={ fileInputRef }
                onChange={ handleInputChange }
              />
              <input
                id="file-capture"
                type="file"
                accept="image/png, image/jpeg"
                capture
                ref={ fileCaptureRef }
                onChange={ handleInputChange }
              />
            </Hidden>
            <Card square elevation={ 0 }>
              <StyledCardActionArea onClick={ toggleDrawer(true) }>
                {recipePhoto && (
                  <>
                    <RecipePhoto component="img" image={ recipePhoto } title="Recipe photo" />
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
                  <GenericTextField id={ field.name } label="Title" fullWidth variant="filled" { ...field } />
                )}
              </Field>
              <Field name="source">
                {({ field }) => (
                  <GenericTextField id={ field.name } label="Source" fullWidth variant="filled" { ...field } />
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <GenericTextField
                    id={ field.name }
                    label="Description"
                    fullWidth
                    multiline
                    rowsMax={ 4 }
                    variant="filled"
                    { ...field }
                  />
                )}
              </Field>
              <StyledDivider />

              <PrepTimes />
              <StyledDivider />

              <Ingredients />
              <StyledDivider />

              <PrepNotes />
              <StyledDivider />

              <Field name="main-ingredient">
                {({ field }) => (
                  <GenericTextField
                    id={ field.name }
                    label="Main Ingredient"
                    fullWidth
                    select
                    SelectProps={ { native: true } }
                    variant="filled"
                    { ...field }
                  >
                    <option value="" />
                    {MAIN_INGREDIENT_OPTIONS.map(({ value, label }) => (
                      <option key={ value } value={ value }>
                        {label}
                      </option>
                    ))}
                  </GenericTextField>
                )}
              </Field>
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
              <StyledDivider />

              <Directions />

              {!isMobileOnly && (
                <>
                  <StyledDivider />
                  <Button color="primary" variant="contained" size="large" onClick={ submitForm } fullWidth>
                    Save Recipe
                  </Button>
                </>
              )}
            </TextFieldsContainer>
          </Form>
        </Container>
      }
    />
  );
}

function AddRecipe() {
  const handleSubmit = (values) => {
    console.log(values); // TODO:
  };

  return (
    <Formik initialValues={ INITIAL_VALUES } onSubmit={ handleSubmit }>
      {() => <FormikContent />}
    </Formik>
  );
}

export default AddRecipe;
