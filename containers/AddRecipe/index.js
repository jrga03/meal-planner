import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Formik, useFormikContext } from "formik";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { isIOS } from "react-device-detect";
import { useSnackbar } from "notistack";

// Utilities
import { usePreventRouteChangeIf } from "utils/hooks";
import { UserContext } from "utils/user";
import { createLoginUrl } from "utils/urlHelper";
import Fetch from "utils/request";

// Components
import PageWrapper from "components/PageWrapper";
import FormikContent from "containers/AddRecipe/Form";
import { SkeletonPhoto, SkeletonField, SkeletonDivider } from "containers/AddRecipe/styles";

// Constants
import { INITIAL_VALUES, INITIAL_STATUS, RECIPE_SCHEMA } from "containers/AddRecipe/constants";

// Dynamic components
const Dialog = dynamic(() => import("@material-ui/core/Dialog"));
const DialogActions = dynamic(() => import("@material-ui/core/DialogActions"));
const DialogTitle = dynamic(() => import("@material-ui/core/DialogTitle"));

/**
 * PageContent
 */
function PageContent({ submitted }) {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const { submitForm, dirty, isSubmitting, isValidating, status } = useFormikContext();

  const { uploading } = status;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [discardConfirmed, setDiscardConfirmed] = useState(false);
  const [preventedRouteUrl, setPreventedUrl] = useState(null);

  // Prevent route change if form is dirty
  usePreventRouteChangeIf(!submitted && dirty && !discardConfirmed, (url) => {
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
      if (!submitted && dirty && !loading && user) {
        event.preventDefault();
        event.returnValue = "";
        return event;
      }
    },
    [submitted, dirty, loading, user]
  );

  // Listen to page navigation using browser
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [handleBeforeUnload]);

  const handleDialogClose = () => setDialogOpen(false);

  const handleDiscardChanges = () => {
    handleDialogClose();
    setDiscardConfirmed(true);
  };

  const handleBack = () => {
    if (dirty) {
      setDialogOpen(true);
    } else {
      router.back();
    }
  };

  const handleSave = () => submitForm();

  const isLoading = loading || !user;

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
            disabled={ isValidating || isSubmitting || uploading || loading || !user }
          >
            Save
          </Button>
        )
      } }
      withFooter={ false }
    >
      {isLoading && (
        <>
          <SkeletonPhoto variant="rect" />
          <SkeletonField variant="rect" />
          <SkeletonField variant="rect" />
          <SkeletonField variant="rect" />
          <SkeletonDivider variant="rect" />
          <SkeletonField variant="text" width={ 200 } />
          <SkeletonField variant="rect" />
          <SkeletonField variant="text" width={ 200 } />
          <SkeletonField variant="rect" />
          <SkeletonDivider variant="rect" />
          <SkeletonField variant="text" width={ 200 } />
          <SkeletonField variant="rect" />
        </>
      )}
      {!isLoading && (
        <>
          <FormikContent />
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
        </>
      )}
    </PageWrapper>
  );
}

PageContent.propTypes = {
  submitted: PropTypes.bool.isRequired
};

/**
 * AddRecipe
 */
function AddRecipe() {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !loading && !user) {
      router.push(createLoginUrl(router.asPath));
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(
    async (values) => {
      const savingKey = enqueueSnackbar("Saving...", { persist: true });

      try {
        const payload = {
          ...values,
          author: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            nickname: user.given_name || user.nickname
          }
        };

        const { id } = await Fetch("/api/recipe/save", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        setSubmitted(true);
        closeSnackbar(savingKey);

        if (id) {
          router.push(`/recipe/${id}`);
        }
      } catch (error) {
        let message = "Something went wrong";
        if (error.response) {
          const response = await error.response.json();
          message = response.message;
        }

        closeSnackbar(savingKey);
        enqueueSnackbar(message, { variant: "error" });
      }
    },
    [user, enqueueSnackbar, closeSnackbar, router]
  );

  return (
    <Formik
      initialValues={ INITIAL_VALUES }
      onSubmit={ handleSubmit }
      validationSchema={ RECIPE_SCHEMA }
      validateOnBlur={ false }
      validateOnChange={ false }
      initialStatus={ INITIAL_STATUS }
    >
      {() => <PageContent submitted={ submitted } />}
    </Formik>
  );
}

export default AddRecipe;
