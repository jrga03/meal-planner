import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import TodayIcon from "@material-ui/icons/Today";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import { Container } from "../styles";

import { APP_NAME, NAVIGATION_ITEMS } from "../constants";

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
function DesktopHeader({ isDark, setPaletteType }) {
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
                  {...bindTrigger(popupState)}
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
      </Container>
      <FormControlLabel
        control={<Switch classes={toggleClasses} checked={isDark} onChange={handleToggle(!isDark)} name="isDark" />}
        label="Dark mode"
        labelPlacement="start"
      />
    </>
  );
}

DesktopHeader.propTypes = {
  isDark: PropTypes.bool.isRequired,
  setPaletteType: PropTypes.func.isRequired
};

export default DesktopHeader;
