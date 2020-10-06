import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";

import { DrawerContentContainer, StyledList, StyledDivider } from "../styles";

import { APP_NAME, NAVIGATION_ITEMS } from "../constants";

/**
 * ListItem with Link
 */
function ListItemLink({ Icon, primary, href }) {
  const router = useRouter();
  const selected = router.asPath === href;
  const color = selected ? "primary" : "inherit";

  return (
    <li>
      <Link href={href}>
        <ListItem button selected={selected}>
          <ListItemIcon>
            <Icon color={color} />
          </ListItemIcon>
          <ListItemText primary={primary} primaryTypographyProps={{ color }} />
        </ListItem>
      </Link>
    </li>
  );
}

ListItemLink.propTypes = {
  Icon: PropTypes.func.isRequired,
  primary: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

/**
 * Header for mobile devices
 */
function MobileHeader() {
  const [drawerStatus, setDrawerStatus] = useState(false);

  /**
   * Handles drawer toggle
   * @param {Boolean} [state] - State of drawer
   * @returns {Function}
   */
  function handleToggleDrawer(state) {
    return function () {
      setDrawerStatus(!!state);
    };
  }

  return (
    <>
      <IconButton color="inherit" aria-label="Menu" onClick={handleToggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        {APP_NAME}
      </Typography>
      <div className="grow" />
      <Link href="/search">
        <IconButton color="inherit" aria-label="Search">
          <Search />
        </IconButton>
      </Link>
      <Drawer
        open={drawerStatus}
        onClose={handleToggleDrawer(false)}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <DrawerContentContainer>
          {NAVIGATION_ITEMS.map(({ title, items }, index) => (
            <React.Fragment key={title}>
              <StyledList component="nav" subheader={<ListSubheader>{title}</ListSubheader>}>
                {items.map((item) => (
                  <ListItemLink key={item.primary} onClick={handleToggleDrawer(false)} {...item} />
                ))}
              </StyledList>
              {index !== NAVIGATION_ITEMS.length - 1 && <StyledDivider variant="middle" />}
            </React.Fragment>
          ))}
        </DrawerContentContainer>
      </Drawer>
    </>
  );
}

export default MobileHeader;
