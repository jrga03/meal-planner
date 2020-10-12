import React, { useContext } from "react";
import PropTypes from "prop-types";
import { isMobileOnly } from "react-device-detect";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { StyledAppBar, StyledToolbar } from "containers/Header/styles";
import MobileHeader from "containers/Header/Mobile";
import DesktopHeader from "containers/Header/Desktop";
import { APP_NAME } from "containers/Header/constants";

import { PaletteContext } from "pages/_app";
import { useUser } from "utils/user";

/**
 * Header componnent
 */
function Header(props) {
  const { isDark, setPaletteType } = useContext(PaletteContext);
  const isSmall = useMediaQuery("(max-width:800px)");
  const HeaderComponent = isMobileOnly || isSmall ? MobileHeader : DesktopHeader;
  const user = useUser();

  return (
    <StyledAppBar position="fixed" component="nav">
      <Container maxWidth="md">
        <StyledToolbar disableGutters>
          <HeaderComponent isDark={isDark} setPaletteType={setPaletteType} auth={user} {...props} />
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
