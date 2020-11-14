import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Utilities
import { createAddRecipeUrl } from "utils/urlHelper";

// Dynamic Components
const Dialog = dynamic(() => import("@material-ui/core/Dialog"));
const DialogTitle = dynamic(() => import("@material-ui/core/DialogTitle"));
const DialogContent = dynamic(() => import("@material-ui/core/DialogContent"));
const DialogActions = dynamic(() => import("@material-ui/core/DialogActions"));
const List = dynamic(() => import("@material-ui/core/List"));
const ListItem = dynamic(() => import("@material-ui/core/ListItem"));
const ListItemText = dynamic(() => import("@material-ui/core/ListItemText"));
const TextField = dynamic(() => import("@material-ui/core/TextField"));
const Button = dynamic(() => import("@material-ui/core/Button"));
const Divider = dynamic(() => import("@material-ui/core/Divider"));
const CircularProgress = dynamic(() => import("@material-ui/core/CircularProgress"));
const InputAdornment = dynamic(() => import("@material-ui/core/InputAdornment"));

export const AddRecipeDialogContext = createContext({
  title: "",
  type: "",
  open: false,
  handleAddRecipe: () => {}
});

function AddRecipeDialogProvider({ children }) {
  const context = useContext(AddRecipeDialogContext);
  const [title, setTitle] = useState(context.title);
  const [type, setType] = useState(context.type);
  const [open, setOpen] = useState(context.open);
  const [mounted, setMounted] = useState(false);

  const [error, setError] = useState("");
  const [importing, setImporting] = useState(false);
  const router = useRouter();

  const inputRef = useRef(null);

  useEffect(() => {
    router.prefetch(createAddRecipeUrl());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImportUrl = () => {
    const url = inputRef?.current.value;

    let valid = false;
    try {
      valid = Boolean(new URL(url));
    } catch {
      // Not a valid URL
    }

    if (!valid) {
      setError("Must be a valid URL");
      return;
    }

    setImporting(true);
    router.push(createAddRecipeUrl(url));

    if (router.pathname === "/recipe/add") {
      setOpen(false);
      setImporting(false);
    } else {
      setTimeout(() => {
        setOpen(false);
        setImporting(false);
      }, 5000);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleImportUrl();
    }
  };

  const handleFocus = () => {
    setError("");
  };

  const handleCancel = () => {
    setOpen(false);
    setError("");
  };

  const handleDialogClose = (value) => () => {
    setOpen(false);
    if (value) {
      switch (value) {
        case "manual":
          router.push("/recipe/add");
          break;
        case "url":
          setTitle("Import Recipe");
          setType("form");
          setOpen(true);
          break;
      }
    }
  };

  const handleAddRecipeClick = () => {
    setMounted(true);
    setOpen(true);
    setTitle("Add Recipe");
    setType("select");
  };

  const value = {
    title,
    type,
    open,
    handleAddRecipe: handleAddRecipeClick
  };

  return (
    <AddRecipeDialogContext.Provider value={ value }>
      {children}
      {mounted && (
        <Dialog fullWidth maxWidth="xs" onClose={ handleCancel } open={ open }>
          <DialogTitle>{title}</DialogTitle>
          <Divider />
          {type === "select" && (
            <List>
              <ListItem button onClick={ handleDialogClose("manual") }>
                <ListItemText>Add a Recipe manually</ListItemText>
              </ListItem>
              <ListItem button onClick={ handleDialogClose("url") }>
                <ListItemText>Import a Recipe by URL</ListItemText>
              </ListItem>
            </List>
          )}
          {type === "form" && (
            <>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="recipe-url"
                  label="URL of recipe"
                  type="url"
                  fullWidth
                  placeholder="http://"
                  onFocus={ handleFocus }
                  onKeyDown={ handleKeyDown }
                  error={ !!error }
                  helperText={ error }
                  disabled={ importing }
                  InputProps={ {
                    endAdornment: importing && (
                      <InputAdornment position="end">
                        <CircularProgress size={ 16 } />
                      </InputAdornment>
                    )
                  } }
                  inputRef={ inputRef }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={ handleCancel } color="secondary" disabled={ importing }>
                  Cancel
                </Button>
                <Button onClick={ handleImportUrl } color="primary" disabled={ importing }>
                  Import
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      )}
    </AddRecipeDialogContext.Provider>
  );
}

AddRecipeDialogProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AddRecipeDialogProvider;
