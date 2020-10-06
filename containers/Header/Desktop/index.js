import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import TodayIcon from "@material-ui/icons/Today";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import { Container } from "../styles";

import { APP_NAME, NAVIGATION_ITEMS } from "../constants";

/**
 * Header for desktop
 */
function DesktopHeader() {
  const router = useRouter();
  const isSelected = (href) => router.asPath === href;

  const buttonIcons = {
    Cook: <OutdoorGrillIcon />,
    Plan: <TodayIcon />
  };

  return (
    <>
      <Typography variant="h6" noWrap>
        {APP_NAME}
      </Typography>
      <Container>
        {/* {NAVIGATION_ITEMS.map(({ primary, href, divider }) => (
          <>
            <Link key={primary} href={href}>
              <Button variant={isSelected(href) ? "contained" : "text"} color="primary">
                <Typography variant={isSelected(href) ? "body1" : "body2"}>{primary}</Typography>
              </Button>
            </Link>
            {divider && <Divider orientation="vertical" variant="middle" flexItem />}
          </>
        ))} */}
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
    </>
  );
}

export default DesktopHeader;
