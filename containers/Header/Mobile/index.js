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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import MenuIcon from "@material-ui/icons/Menu";
import DarkModeIcon from "@material-ui/icons/NightsStay";
import Search from "@material-ui/icons/Search";

import { DrawerContentContainer, StyledList, StyledDivider } from "../styles";

import { NAVIGATION_ITEMS } from "../constants";

/**
 * ListItem with Link
 */
function ListItemLink({ Icon, primary, href, onClick }) {
  const router = useRouter();
  const selected = router.asPath === href;
  const color = selected ? "primary" : "inherit";

  return (
    <li>
      <Link href={href}>
        <ListItem button selected={selected} onClick={onClick}>
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
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

function CustomHeader({ title, startNode, endNode }) {
  return (
    <>
      {startNode}
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
      <div className="grow" />
      {endNode}
    </>
  );
}

CustomHeader.propTypes = {
  title: PropTypes.string,
  startNode: PropTypes.node,
  endNode: PropTypes.node
};

/**
 * Header for mobile devices
 */
function MobileHeader({ isDark, setPaletteType, title, startNode, endNode }) {
  const [drawerStatus, setDrawerStatus] = useState(false);

  if (startNode || endNode) {
    return <CustomHeader title={title} startNode={startNode} endNode={endNode} />;
  }

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
      <IconButton edge="start" color="inherit" aria-label="Menu" onClick={handleToggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
      <div className="grow" />
      <Link href="/search">
        <IconButton edge="end" color="inherit" aria-label="Search">
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
          {NAVIGATION_ITEMS.map(({ title, items }) => (
            <React.Fragment key={title}>
              <StyledList component="nav" subheader={<ListSubheader>{title}</ListSubheader>}>
                {items.map((item) => (
                  <ListItemLink key={item.primary} onClick={handleToggleDrawer(false)} {...item} />
                ))}
              </StyledList>
              <StyledDivider variant="middle" />
            </React.Fragment>
          ))}
          <StyledList subheader={<ListSubheader>Settings</ListSubheader>}>
            <ListItem>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <ListItemText primary="Dark mode" />
              <ListItemSecondaryAction>
                <Switch color="primary" edge="end" checked={isDark} onChange={handleToggle(!isDark)} />
              </ListItemSecondaryAction>
            </ListItem>
          </StyledList>
        </DrawerContentContainer>
      </Drawer>
    </>
  );
}

MobileHeader.propTypes = {
  isDark: PropTypes.bool.isRequired,
  setPaletteType: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  startNode: PropTypes.node,
  endNode: PropTypes.node
};

MobileHeader.defaultProps = {
  startNode: undefined,
  endNode: undefined
};

export default MobileHeader;
