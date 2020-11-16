import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { isMobileOnly } from "react-device-detect";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Styles
import { StyledAppBar, StyledToolbar } from "containers/Header/styles";

// Constants
import { APP_NAME } from "containers/Header/constants";

// Contexts
import { PaletteContext } from "pages/_app";
import { UserContext } from "utils/user";
import AddRecipeDialogProvider from "containers/AddRecipe/AddRecipeDialog";

// Dynamic components
const MobileHeader = dynamic(() => import("containers/Header/Mobile"));
const DesktopHeader = dynamic(() => import("containers/Header/Desktop"));

/**
 * Header componnent
 */
function Header(props) {
  const user = useContext(UserContext);
  const router = useRouter();

  const { isDark, setPaletteType } = useContext(PaletteContext);
  const isSmall = useMediaQuery("(max-width:800px)");
  const HeaderComponent = isMobileOnly || isSmall ? MobileHeader : DesktopHeader;

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

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <StyledAppBar position="fixed" component="nav">
      <Container maxWidth="md">
        <StyledToolbar disableGutters>
          <AddRecipeDialogProvider>
            <HeaderComponent isDark={ isDark } setPaletteType={ setPaletteType } auth={ user } { ...props } />
          </AddRecipeDialogProvider>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
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
