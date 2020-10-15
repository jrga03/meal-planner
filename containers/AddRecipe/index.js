import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Formik, Form, Field, useFormikContext } from "formik";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
import * as Yup from "yup";

import { fileToBase64Img, compressImage } from "utils/fileHelper";
import { usePreventRouteChangeIf } from "utils/hooks";
import { upload } from "utils/cloudinary";
import PageWrapper from "components/PageWrapper";
import { INITIAL_VALUES } from "containers/AddRecipe/constants";
import {
  TextFieldsContainer,
  StyledCardActionArea,
  StyledCardContent,
  PhotoOverlay,
  StyledDivider,
  GenericTextField,
  RecipePhoto
} from "containers/AddRecipe/styles";
import PrepTimes from "containers/AddRecipe/PrepTimes";
import Ingredients from "containers/AddRecipe/Ingredients";
import PrepNotes from "containers/AddRecipe/PrepNotes";
import Directions from "containers/AddRecipe/Directions";
import MainIngredient from "containers/AddRecipe/MainIngredient";
import Tags from "containers/AddRecipe/Tags";

const Dialog = dynamic(() => import("@material-ui/core/Dialog"));
const DialogActions = dynamic(() => import("@material-ui/core/DialogActions"));
const DialogTitle = dynamic(() => import("@material-ui/core/DialogTitle"));

const RecipeSchema = Yup.object().shape({
  photo: Yup.string(),
  title: Yup.string().min(3, "Title too short!").max(50, "Title too long!").required("Required"),
  source: Yup.string(),
  description: Yup.string(),
  "prep-hours": Yup.string(),
  "prep-minutes": Yup.string(),
  "cook-hours": Yup.string(),
  "cook-minutes": Yup.string(),
  ingredients: Yup.array().of(
    Yup.object().shape({
      amount: Yup.string(),
      unit: Yup.string(),
      ingredient: Yup.string(),
      note: Yup.string()
    })
  ),
  "prep-notes": Yup.array().of(
    Yup.object().shape({
      time: Yup.number(),
      note: Yup.string()
    })
  ),
  directions: Yup.string(),
  "main-ingredient": Yup.string().required("Required"),
  tags: Yup.array().of(Yup.string())
});

async function uploadImage({ file, setUploading }) {
  try {
    setUploading(true);
    const compressed = await compressImage(file);
    const uploaded = await upload(compressed, { folder: "recipes" });
    const data = await uploaded.json();

    return data.secure_url;
  } catch (error) {
    console.log(error);
    return "";
  } finally {
    setUploading(false);
  }
}

function FormikContent() {
  const isSmall = useMediaQuery("(max-width:800px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recipePhoto, setRecipePhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [discardConfirmed, setDiscardConfirmed] = useState(false);
  const [preventedRouteUrl, setPreventedUrl] = useState(null);

  const fileInputRef = useRef(null);
  const fileCaptureRef = useRef(null);

  const router = useRouter();
  const { submitForm, dirty, setFieldValue, errors, isSubmitting, isValidating } = useFormikContext();

  // Prevent route change if form is dirty
  usePreventRouteChangeIf(dirty && !discardConfirmed, (url) => {
    setDialogOpen(true);
    setPreventedUrl(url);
  });

  // Handler for action after selecting to discard unsaved changes
  useEffect(() => {
    if (discardConfirmed) {
      preventedRouteUrl === null ? router.back() : router.push(preventedRouteUrl);
    }
  }, [discardConfirmed, preventedRouteUrl, router]);

  const handleBeforeUnload = useCallback(
    (event) => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = "";
        return event;
      }
    },
    [dirty]
  );

  // Listen to page navigation using browser
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [handleBeforeUnload]);

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
      const photoUrl = await uploadImage({ file, setUploading });
      setFieldValue("photo", photoUrl);
    }
  };

  const handleBack = () => {
    if (dirty) {
      setDialogOpen(true);
    } else {
      router.back();
    }
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleDiscardChanges = () => {
    handleDialogClose();
    setDiscardConfirmed(true);
  };

  const handleSave = () => submitForm();

  return (
    <PageWrapper
      maxWidth="sm"
      disableGutters
      withHeader
      HeaderProps={ {
        title: "Add Recipe",
        startNode: (
          <IconButton edge="start" color="inherit" aria-label="Menu" onClick={ handleBack }>
            {isIOS ? <ArrowBackIosIcon /> : <ArrowBackIcon />}
          </IconButton>
        ),
        endNode: (
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            size="small"
            onClick={ handleSave }
            disabled={ isValidating || isSubmitting || uploading }
          >
            Save
          </Button>
        )
      } }
      withFooter={ false }
    >
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
          <StyledCardActionArea onClick={ toggleDrawer(true) } disabled={ isValidating || isSubmitting }>
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
                disabled={ isValidating || isSubmitting || uploading }
              >
                Save Recipe
              </Button>
            </>
          )}
        </TextFieldsContainer>
      </Form>

      {dialogOpen && (
        <Dialog open={ dialogOpen } onClose={ handleDialogClose } aria-labelledby="alert-dialog-title">
          <DialogTitle id="alert-dialog-title">Discard unsaved changes?</DialogTitle>

          <DialogActions>
            <Button onClick={ handleDialogClose } color="primary">
              Cancel
            </Button>
            <Button onClick={ handleDiscardChanges } color="primary" autoFocus>
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </PageWrapper>
  );
}

function AddRecipe() {
  const handleSubmit = (values) => {
    console.log("handleSubmit", values); // TODO:
  };

  return (
    <Formik
      initialValues={ INITIAL_VALUES }
      onSubmit={ handleSubmit }
      validationSchema={ RecipeSchema }
      validateOnBlur={ false }
      validateOnChange={ false }
    >
      {() => <FormikContent />}
    </Formik>
  );
}

export default AddRecipe;
