import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { isMobileOnly } from "react-device-detect";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Styles
import { StyledAppBar, StyledToolbar } from "containers/Header/styles";

// Constants
import { APP_NAME } from "containers/Header/constants";

// Contexts
import { PaletteContext } from "pages/_app";
import { UserContext } from "utils/user";

// Utilities
import { createAddRecipeUrl } from "utils/urlHelper";

const MobileHeader = dynamic(() => import("containers/Header/Mobile"));
const DesktopHeader = dynamic(() => import("containers/Header/Desktop"));
const Dialog = dynamic(() => import("@material-ui/core/Dialog"));
const DialogTitle = dynamic(() => import("@material-ui/core/DialogTitle"));
const DialogContent = dynamic(() => import("@material-ui/core/DialogContent"));
const DialogActions = dynamic(() => import("@material-ui/core/DialogActions"));
const List = dynamic(() => import("@material-ui/core/List"));
const ListItem = dynamic(() => import("@material-ui/core/ListItem"));
const ListItemText = dynamic(() => import("@material-ui/core/ListItemText"));
const TextField = dynamic(() => import("@material-ui/core/TextField"));
const Button = dynamic(() => import("@material-ui/core/Button"));

function DialogComponent({ title, open, type, onClose }) {
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
      onClose()();
      setImporting(false);
    } else {
      setTimeout(() => {
        onClose()();
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
    onClose()();
    setError("");
  };

  return (
    <Dialog fullWidth maxWidth="xs" onClose={ handleCancel } open={ open }>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      {type === "select" && (
        <List>
          <ListItem button onClick={ onClose("manual") }>
            <ListItemText>Add a Recipe manually</ListItemText>
          </ListItem>
          <ListItem button onClick={ onClose("url") }>
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
  );
}

DialogComponent.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  type: PropTypes.string,
  onClose: PropTypes.func
};

/**
 * Header componnent
 */
function Header(props) {
  const user = useContext(UserContext);
  const router = useRouter();

  const { isDark, setPaletteType } = useContext(PaletteContext);
  const isSmall = useMediaQuery("(max-width:800px)");
  const HeaderComponent = isMobileOnly || isSmall ? MobileHeader : DesktopHeader;

  const [dialogMounted, setDialogMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState(null);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === "/api/auth/logout") {
        // Clear UserContext
        user.logout();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDialogClose = (value) => () => {
    setDialogOpen(false);
    if (value) {
      switch (value) {
        case "manual":
          router.push("/recipe/add");
          break;
        case "url":
          setDialogTitle("Import Recipe");
          setDialogType("form");
          setDialogOpen(true);
          break;
      }
    }
  };

  const handleAddRecipeClick = () => {
    setDialogMounted(true);
    setDialogOpen(true);
    setDialogTitle("Add Recipe");
    setDialogType("select");
  };

  return (
    <>
      <StyledAppBar position="fixed" component="nav">
        <Container maxWidth="md">
          <StyledToolbar disableGutters>
            <HeaderComponent
              isDark={ isDark }
              setPaletteType={ setPaletteType }
              auth={ user }
              onClickAddRecipe={ handleAddRecipeClick }
              { ...props }
            />
          </StyledToolbar>
        </Container>
      </StyledAppBar>
      {dialogMounted && (
        <DialogComponent title={ dialogTitle } open={ dialogOpen } type={ dialogType } onClose={ handleDialogClose } />
      )}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  startNode: PropTypes.node,
  endNode: PropTypes.node
};

Header.defaultProps = {
  title: APP_NAME,
  startNode: undefined,
  endNode: undefined
};

export default Header;
