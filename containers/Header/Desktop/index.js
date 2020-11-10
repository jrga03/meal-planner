import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Avatar from "@material-ui/core/Avatar";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import TodayIcon from "@material-ui/icons/Today";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Skeleton from "@material-ui/lab/Skeleton";
import PopupState, { bindPopover, bindHover } from "material-ui-popup-state";
import Popover from "material-ui-popup-state/HoverPopover";

import {
  Container,
  SpacerWidth,
  SpacerGrow,
  ProfileContainer,
  StyledSwitch,
  StyledTypography
} from "containers/Header/styles";

import { APP_NAME, NAVIGATION_ITEMS } from "containers/Header/constants";

import { createLoginUrl } from "utils/urlHelper";

function HeaderSubItem({ primary, href, popupStateClose, onClickAddRecipe }) {
  const router = useRouter();
  const isSelected = (href) => router.asPath === href;

  const handleClick = () => {
    popupStateClose();
    if (!href) {
      onClickAddRecipe();
    }
  };

  const component = (
    <ListItem button onClick={ handleClick } selected={ isSelected(href) }>
      <ListItemText primary={ primary } primaryTypographyProps={ { color: isSelected(href) ? "primary" : "inherit" } } />
    </ListItem>
  );

  if (!href) {
    return component;
  }

  return (
    <Link key={ href } href={ href }>
      {component}
    </Link>
  );
}

HeaderSubItem.propTypes = {
  primary: PropTypes.string,
  href: PropTypes.string,
  popupStateClose: PropTypes.func,
  onClickAddRecipe: PropTypes.func
};

/**
 * Header for desktop
 */
function DesktopHeader({ auth, isDark, setPaletteType, onClickAddRecipe }) {
  const router = useRouter();

  const buttonIcons = {
    Cook: <OutdoorGrillIcon />,
    Plan: <TodayIcon />
  };

  /**
   * Handles toggling of dark mode
   * @param {boolean} dark - Dark mode state
   */
  function handleToggle(dark) {
    return function () {
      const newType = dark ? "dark" : "light";
      setPaletteType(newType);
    };
  }

  return (
    <>
      <Typography variant="h6" noWrap>
        {APP_NAME}
      </Typography>
      <Container>
        {NAVIGATION_ITEMS.map(({ title, items }) => (
          <PopupState key={ title } variant="popover" popupId={ title }>
            {(popupState) => (
              <>
                <Button
                  variant="text"
                  size="large"
                  color="primary"
                  startIcon={ buttonIcons[title] }
                  endIcon={ popupState.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                  { ...bindHover(popupState) }
                >
                  {title}
                </Button>
                <Popover
                  { ...bindPopover(popupState) }
                  anchorOrigin={ {
                    vertical: "bottom",
                    horizontal: "left"
                  } }
                  transformOrigin={ {
                    vertical: "top",
                    horizontal: "left"
                  } }
                >
                  <List component="nav">
                    {items.map(({ primary, href }) => (
                      <HeaderSubItem
                        key={ href || primary }
                        primary={ primary }
                        href={ href }
                        popupStateClose={ popupState.close }
                        onClickAddRecipe={ onClickAddRecipe }
                      />
                    ))}
                  </List>
                </Popover>
              </>
            )}
          </PopupState>
        ))}
        <SpacerWidth $amount={ 4 } />
        <FormControlLabel
          control={ <StyledSwitch checked={ isDark } onChange={ handleToggle(!isDark) } name="isDark" /> }
          label="Dark"
          labelPlacement="end"
        />
      </Container>
      <SpacerGrow />
      {!auth.user && auth.loading && (
        <>
          <Skeleton variant="rect" width={ 100 } style={ { marginRight: "8px" } } />
          <Skeleton variant="circle" width={ 40 } height={ 40 } />
        </>
      )}

      {!auth.loading && (
        <>
          {auth.user && (
            <PopupState variant="popover" popupId="profile">
              {(popupState) => (
                <>
                  <ProfileContainer { ...bindHover(popupState) }>
                    <Typography noWrap align="right">
                      {auth.user.given_name || auth.user.name}
                    </Typography>
                    <Avatar alt={ auth.user.name } src={ auth.user.picture } />
                  </ProfileContainer>
                  <Popover
                    { ...bindPopover(popupState) }
                    anchorOrigin={ {
                      vertical: "bottom",
                      horizontal: "center"
                    } }
                    transformOrigin={ {
                      vertical: "top",
                      horizontal: "left"
                    } }
                  >
                    <List>
                      <Link href="/api/auth/logout">
                        <ListItem button>Logout</ListItem>
                      </Link>
                    </List>
                  </Popover>
                </>
              )}
            </PopupState>
          )}

          {!auth.user && (
            <Button variant="contained" href={ createLoginUrl(router.asPath) }>
              <StyledTypography $isDark={ isDark } color="textPrimary" variant="button">
                Login
              </StyledTypography>
            </Button>
          )}
        </>
      )}
    </>
  );
}

DesktopHeader.propTypes = {
  isDark: PropTypes.bool.isRequired,
  setPaletteType: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.object,
    loading: PropTypes.bool
  }).isRequired,
  onClickAddRecipe: PropTypes.func.isRequired
};

export default DesktopHeader;
