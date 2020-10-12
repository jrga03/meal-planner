import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import TodayIcon from "@material-ui/icons/Today";
import Skeleton from "@material-ui/lab/Skeleton";
import PopupState, { bindPopover, bindHover } from "material-ui-popup-state";
import Popover from "material-ui-popup-state/HoverPopover";

import { Container, Spacer, SpacerGrow, ProfileContainer } from "containers/Header/styles";

import { APP_NAME, NAVIGATION_ITEMS } from "containers/Header/constants";

import createLoginUrl from "utils/urlHelper";

const toggleStyles = makeStyles(() => ({
  switchBase: {
    color: grey[200],
    "&$checked": {
      color: grey[400]
    },
    "&$checked + $track": {
      backgroundColor: grey[400]
    }
  },
  checked: {},
  track: {}
}));

/**
 * Header for desktop
 */
function DesktopHeader({ auth, isDark, setPaletteType }) {
  const toggleClasses = toggleStyles();
  const router = useRouter();
  const isSelected = (href) => router.asPath === href;

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

  const handleLogout = () => router.push("/api/logout");

  return (
    <>
      <Typography variant="h6" noWrap>
        {APP_NAME}
      </Typography>
      <Container>
        {NAVIGATION_ITEMS.map(({ title, items }) => (
          <PopupState key={title} variant="popover" popupId={title}>
            {(popupState) => (
              <React.Fragment>
                <Button
                  variant="text"
                  size="large"
                  color="primary"
                  startIcon={buttonIcons[title]}
                  {...bindHover(popupState)}
                >
                  {title}
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                >
                  <List component="nav">
                    {items.map(({ primary, href }) => (
                      <Link key={href} href={href}>
                        <ListItem button onClick={popupState.close} selected={isSelected(href)}>
                          <ListItemText
                            primary={primary}
                            primaryTypographyProps={{ color: isSelected(href) ? "primary" : "inherit" }}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Popover>
              </React.Fragment>
            )}
          </PopupState>
        ))}
        <Spacer $amount={4} />
        <FormControlLabel
          control={<Switch classes={toggleClasses} checked={isDark} onChange={handleToggle(!isDark)} name="isDark" />}
          label="Dark"
          labelPlacement="end"
        />
      </Container>
      <SpacerGrow />
      {auth.loading ? (
        <>
          <Skeleton variant="rect" width={100} style={{ marginRight: "8px" }} />
          <Skeleton variant="circle" width={40} height={40} />
        </>
      ) : auth.user ? (
        <PopupState variant="popover" popupId="profile">
          {(popupState) => (
            <>
              <ProfileContainer {...bindHover(popupState)}>
                <Typography noWrap align="right">
                  {auth.user.given_name || auth.user.name}
                </Typography>
                <Avatar alt={auth.user.name} src={auth.user.picture} />
              </ProfileContainer>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
              >
                <List>
                  <ListItem button onClick={handleLogout}>
                    Logout
                  </ListItem>
                </List>
              </Popover>
            </>
          )}
        </PopupState>
      ) : (
        <Button variant="contained" href={createLoginUrl(router.pathname)}>
          <Typography color="textPrimary" variant="button">
            Login
          </Typography>
        </Button>
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
  }).isRequired
};

export default DesktopHeader;
