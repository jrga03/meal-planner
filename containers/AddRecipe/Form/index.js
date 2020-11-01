import React, { useState, useRef, useEffect, useContext } from "react";
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
import { fileToBase64Img, compressImage } from "utils/fileHelper";
import { upload } from "utils/cloudinary";
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
function FormikContent() {
  const { user, loading } = useContext(UserContext);

  const isSmall = useMediaQuery("(max-width:800px)");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recipePhoto, setRecipePhoto] = useState(null);

  const fileInputRef = useRef(null);
  const fileCaptureRef = useRef(null);

  const {
    submitForm,
    setFieldValue,
    errors,
    isSubmitting,
    isValidating,
    values,
    status,
    setStatus
  } = useFormikContext();
  const { uploading } = status;

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length) {
      errorKeys.forEach((key) => {
        enqueueSnackbar(`${titleCase(key)}: ${errors[key]}`, {
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

  async function uploadImage(file) {
    const uploadingKey = enqueueSnackbar("Uploading photo");
    try {
      setStatus({
        ...status,
        uploading: true
      });
      const compressed = await compressImage(file);
      const uploaded = await upload(compressed, { folder: "recipes" });
      const data = await uploaded.json();

      closeSnackbar(uploadingKey);
      return data.secure_url;
    } catch (error) {
      enqueueSnackbar("Upload failed. Try again!", { variant: "error" });

      console.log(error);
      return "";
    } finally {
      enqueueSnackbar("Upload success!", { variant: "success" });

      setStatus({
        ...status,
        uploading: false
      });
    }
  }

  const handleInputChange = async (event) => {
    const file = event?.target?.files?.[0];
    let image = null;

    if (file) {
      image = await fileToBase64Img(file);
      setRecipePhoto(image);
      const photoUrl = await uploadImage(file);
      setFieldValue("photo", photoUrl);
    }
  };

  const photo = recipePhoto || values.photo;

  return (
    <>
      <Form>
        <Card square elevation={ 0 }>
          <StyledCardActionArea onClick={ toggleDrawer(true) } disabled={ isValidating || isSubmitting }>
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
                disabled={ isValidating || isSubmitting || uploading || loading || !user }
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

export default FormikContent;
