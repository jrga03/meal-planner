import React from "react";
import PropTypes from "prop-types";
import { isMobileOnly } from "react-device-detect";

import { StyledAppBar, StyledToolbar } from "./styles";

import MobileHeader from "./Mobile";
import DesktopHeader from "./Desktop";

/**
 * Header componnent
 */
function Header({ isDark, setPaletteType }) {
  return (
    <StyledAppBar position="fixed" component="nav">
      <StyledToolbar>
        {isMobileOnly ? (
          <MobileHeader isDark={isDark} setPaletteType={setPaletteType} />
        ) : (
          <DesktopHeader isDark={isDark} setPaletteType={setPaletteType} />
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
}

Header.propTypes = {
  isDark: PropTypes.bool.isRequired,
  setPaletteType: PropTypes.func.isRequired
};

export default Header;
