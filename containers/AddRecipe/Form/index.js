import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { Form, Field, useFormikContext } from "formik";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import CameraIcon from "@material-ui/icons/AddAPhoto";
import GalleryIcon from "@material-ui/icons/PhotoLibrary";
import { isMobileOnly, isMobile } from "react-device-detect";
import { useSnackbar } from "notistack";

// Utilities
import { fileToBase64Img } from "utils/fileHelper";
import { UserContext } from "utils/user";

// Containers
import {
  TextFieldsContainer,
  StyledCardActionArea,
  StyledCardContent,
  PhotoOverlay,
  StyledDivider,
  GenericTextField,
  RecipePhoto
} from "containers/AddRecipe/styles";

// Components
import PrepTimes from "containers/AddRecipe/Form/PrepTimes";
import Ingredients from "containers/AddRecipe/Form/Ingredients";
import PrepNotes from "containers/AddRecipe/Form/PrepNotes";
import Directions from "containers/AddRecipe/Form/Directions";
import MainIngredient from "containers/AddRecipe/Form/MainIngredient";
import Tags from "containers/AddRecipe/Form/Tags";

// Dynamic components
const Avatar = dynamic(() => import("@material-ui/core/Avatar"));
const PhotoIcon = dynamic(() => import("@material-ui/icons/PhotoCamera"));

function titleCase(str) {
  return str
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * FormikContent
 */
function FormikContent({ setPhotoFile }) {
  const { user, loading } = useContext(UserContext);

  const isSmall = useMediaQuery("(max-width:800px)");
  const { enqueueSnackbar } = useSnackbar();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recipePhoto, setRecipePhoto] = useState(null);

  const fileInputRef = useRef(null);
  const fileCaptureRef = useRef(null);

  const { submitForm, errors, isSubmitting, isValid, values } = useFormikContext();

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length) {
      errorKeys.forEach((key) => {
        enqueueSnackbar(`${titleCase(key)}: ${errors[key]}`, {
          key,
          variant: "error",
          preventDuplicate: true
        });
      });
    }
  }, [errors, enqueueSnackbar]);

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
      setRecipePhoto(image);
      setPhotoFile(file);
    }
  };

  const photo = recipePhoto || values.photo;

  return (
    <>
      <Form>
        <Card square elevation={ 0 }>
          <StyledCardActionArea onClick={ toggleDrawer(true) } disabled={ isSubmitting }>
            {photo && (
              <>
                <RecipePhoto component="img" image={ photo } title="Recipe photo" />
                <PhotoOverlay />
              </>
            )}
            <StyledCardContent>
              {!photo && (
                <Avatar>
                  <PhotoIcon />
                </Avatar>
              )}
              <Typography variant="button">{photo ? "Change" : "Add"} Photo</Typography>
            </StyledCardContent>
          </StyledCardActionArea>
        </Card>
        <TextFieldsContainer>
          <Field name="title">
            {({ field }) => (
              <GenericTextField
                id={ field.name }
                label="Title"
                fullWidth
                variant="filled"
                error={ !!errors[field.name] }
                helperText={ errors[field.name] || "" }
                { ...field }
              />
            )}
          </Field>
          <Field name="source">
            {({ field }) => <GenericTextField id={ field.name } label="Source" fullWidth variant="filled" { ...field } />}
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

          <MainIngredient />
          <Tags />
          <StyledDivider />

          <Directions />

          {!(isMobileOnly || isSmall) && (
            <>
              <StyledDivider />
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={ submitForm }
                fullWidth
                disabled={ !isValid || isSubmitting || loading || !user }
              >
                Save Recipe
              </Button>
            </>
          )}
        </TextFieldsContainer>
      </Form>

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
    </>
  );
}

FormikContent.propTypes = {
  setPhotoFile: PropTypes.func.isRequired
};

export default FormikContent;
