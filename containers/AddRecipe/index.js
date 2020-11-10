import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Formik, useFormikContext } from "formik";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { isIOS } from "react-device-detect";
import { useSnackbar } from "notistack";
import useSWR, { mutate } from "swr";

// Utilities
import { usePreventRouteChangeIf } from "utils/hooks";
import { UserContext } from "utils/user";
import { createLoginUrl, createApiImportRecipeUrl } from "utils/urlHelper";
import { compressImage } from "utils/fileHelper";
import { upload, isCloudinaryDomain } from "utils/cloudinary";
import Fetch, { getErrorMessage } from "utils/request";

// Components
import PageWrapper from "components/PageWrapper";
import FormikContent from "containers/AddRecipe/Form";
import { SkeletonPhoto, SkeletonField, SkeletonDivider } from "containers/AddRecipe/styles";

// Constants
import { INITIAL_VALUES, RECIPE_SCHEMA, IMPORT_STATUSES } from "containers/AddRecipe/constants";

// Dynamic components
const Dialog = dynamic(() => import("@material-ui/core/Dialog"));
const DialogActions = dynamic(() => import("@material-ui/core/DialogActions"));
const DialogTitle = dynamic(() => import("@material-ui/core/DialogTitle"));

/**
 * PageContent
 */
function PageContent({ submitted, pageStatus, setPhotoFile }) {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const { submitForm, dirty, isSubmitting } = useFormikContext();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [discardConfirmed, setDiscardConfirmed] = useState(false);
  const [preventedRouteUrl, setPreventedUrl] = useState(null);

  const isEdit = router.pathname === "/recipe/[id]/edit";

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

  const isLoading =
    loading || !user || pageStatus === IMPORT_STATUSES.FETCHING || pageStatus === IMPORT_STATUSES.UNFETCHED;

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
            size="small"
            onClick={ submitForm }
            disabled={ (isEdit && !dirty) || isSubmitting || loading || !user }
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
          <FormikContent setPhotoFile={ setPhotoFile } />
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
  submitted: PropTypes.bool.isRequired,
  pageStatus: PropTypes.string.isRequired,
  setPhotoFile: PropTypes.func.isRequired
};

/**
 * AddRecipe
 */
function AddRecipe() {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    query: { importUrl, id: recipeId },
    pathname
  } = router;
  const isEdit = pathname === "/recipe/[id]/edit";

  const { data, error } = useSWR(() => (recipeId ? `/api/recipe/${recipeId}` : null), Fetch);

  const [pageStatus, setPageStatus] = useState(IMPORT_STATUSES.UNFETCHED);
  const [submitted, setSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [photoFile, setPhotoFile] = useState(null);
  const [urlImported, setUrlImported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !loading && !user) {
      router.push(createLoginUrl(router.asPath));
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * If `importUrl` exists, get recipe data from URL
   */
  useEffect(() => {
    async function getUrlData() {
      setPageStatus(IMPORT_STATUSES.FETCHING);
      try {
        const { data } = await Fetch(createApiImportRecipeUrl(importUrl));
        setInitialValues(data);

        closeSnackbar("fetching");
        enqueueSnackbar("Import success!", { variant: "success", preventDuplicate: true });
        setUrlImported(true);
      } catch (error) {
        const message = getErrorMessage(error);

        closeSnackbar("fetching");
        enqueueSnackbar(message, { variant: "error" });
        setPageStatus(IMPORT_STATUSES.NONE);
      }
    }

    if (!isEdit && importUrl) {
      if (pageStatus === IMPORT_STATUSES.FETCHING || pageStatus === IMPORT_STATUSES.UNFETCHED) {
        enqueueSnackbar("Fetching recipe data...", {
          key: "fetching",
          preventDuplicate: true
        });
      }

      if (user && pageStatus === IMPORT_STATUSES.UNFETCHED) {
        getUrlData();
      }
    }
  }, [user, importUrl, pageStatus, enqueueSnackbar, closeSnackbar, isEdit]);

  /**
   * Edit recipe side effects
   */
  useEffect(() => {
    if (isEdit) {
      if (!data && !error) {
        setPageStatus(IMPORT_STATUSES.FETCHING);
        return;
      }

      if (error) {
        if (recipeId) {
          router.replace(`/recipe/${recipeId}`);
        } else {
          router.replace("/recipes");
        }
        return;
      }

      if (data) {
        setInitialValues(data);
      }
    }
  }, [data, error, isEdit, recipeId, router]);

  /**
   * Page status side effects
   */
  useEffect(() => {
    let status = IMPORT_STATUSES.NONE;

    if (importUrl || isEdit) {
      status = IMPORT_STATUSES.UNFETCHED;
    }

    if (data || urlImported) {
      status = IMPORT_STATUSES.DONE;
    }

    setPageStatus(status);
  }, [data, importUrl, isEdit, urlImported]);

  const uploadImage = useCallback(
    async (file) => {
      const uploadingKey = enqueueSnackbar("Uploading photo");
      try {
        let compressed = file;
        if (typeof file !== "string") {
          compressed = await compressImage(file);
        }
        const uploaded = await upload(compressed, { folder: "recipes" });
        const data = await uploaded.json();

        closeSnackbar(uploadingKey);
        enqueueSnackbar("Upload success!", { variant: "success" });

        return data.secure_url;
      } catch (error) {
        enqueueSnackbar("Upload failed. Try again!", { variant: "error" });

        console.log(error);
        return "";
      }
    },
    [closeSnackbar, enqueueSnackbar]
  );

  const { sub, name, email, given_name, nickname } = user || {};
  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      const savingKey = enqueueSnackbar("Saving...", { variant: "info", persist: true });

      let photoUrl = values.photo;
      if (photoFile || !isCloudinaryDomain(photoUrl)) {
        const toUpload = photoUrl || photoFile;
        photoUrl = await uploadImage(toUpload);
      }

      try {
        const payload = {
          ...values,
          photo: photoUrl
        };

        let id;
        if (isEdit) {
          // eslint-disable-next-line no-unused-vars
          const { _id, __v, ...restOfPayload } = payload;

          await Fetch("/api/recipe/save", {
            method: "PUT",
            body: JSON.stringify({
              id: recipeId,
              payload: restOfPayload
            })
          });

          id = recipeId;
          mutate(`/api/recipe/${recipeId}`);
        } else {
          const saved = await Fetch("/api/recipe/save", {
            method: "POST",
            body: JSON.stringify({
              ...payload,
              author: {
                id: sub,
                name,
                email,
                nickname: given_name || nickname
              }
            })
          });
          id = saved.id;
        }

        setSubmitted(true);
        closeSnackbar(savingKey);

        router.push(`/recipe/${id}`);
      } catch (error) {
        const message = getErrorMessage(error);
        closeSnackbar(savingKey);
        enqueueSnackbar(message, { variant: "error" });
        setSubmitting(false);
      }
    },
    [
      enqueueSnackbar,
      photoFile,
      uploadImage,
      sub,
      name,
      email,
      given_name,
      nickname,
      isEdit,
      closeSnackbar,
      router,
      recipeId
    ]
  );

  return (
    <>
      <Head>
        <title>Add Recipe</title>
      </Head>
      <Formik
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        validationSchema={ RECIPE_SCHEMA }
        validateOnBlur={ false }
        validateOnChange={ false }
        enableReinitialize
      >
        {() => <PageContent submitted={ submitted } pageStatus={ pageStatus } setPhotoFile={ setPhotoFile } />}
      </Formik>
    </>
  );
}

export default AddRecipe;
