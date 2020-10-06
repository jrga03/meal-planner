import React from "react";
import { isMobileOnly } from "react-device-detect";

import { StyledAppBar, StyledToolbar } from "./styles";

import MobileHeader from "./Mobile";
import DesktopHeader from "./Desktop";

/**
 * Header componnent
 */
function Header() {
  return (
    <StyledAppBar position="fixed" component="nav">
      <StyledToolbar>{isMobileOnly ? <MobileHeader /> : <DesktopHeader />}</StyledToolbar>
    </StyledAppBar>
  );
}

export default Header;
