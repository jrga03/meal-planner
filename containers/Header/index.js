import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import AppsIcon from "@material-ui/icons/Apps";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { isMobileOnly } from "react-device-detect";

import { StyledAppBar, StyledToolbar, Container, DrawerContentContainer } from "./styles";

const APP_NAME = "Meal Planner";

/**
 * ListItem with Link
 */
function ListItemLink({ icon, primary, href, onClick, divider }) {
  const router = useRouter();
  const selected = router.asPath === href;

  return (
    <li>
      <Link href={href}>
        <ListItem button onClick={onClick} divider={divider} selected={Boolean(selected)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </Link>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element.isRequired,
  primary: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  divider: PropTypes.bool
};

ListItemLink.defaultProps = {
  divider: false
};

/**
 * Header for mobile devices
 */
function MobileHeader() {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const theme = useTheme();

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

  const drawerItems = [
    {
      icon: <RestaurantIcon />,
      primary: "Recipes",
      href: "/recipes"
    },
    {
      icon: <AppsIcon />,
      primary: "Categories",
      divider: true,
      href: "/categories"
    },
    {
      icon: <DateRangeIcon />,
      primary: "Plan Meals",
      href: "/plan"
    },
    {
      icon: <AddCircleIcon />,
      primary: "Add a Recipe",
      href: "/recipe/add"
    }
  ];

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
          <div style={{ minHeight: `${theme.mixins.toolbar.minHeight}px` }} />
          <List>
            {drawerItems.map((itemProps) => (
              <ListItemLink key={itemProps.primary} onClick={handleToggleDrawer(false)} {...itemProps} />
            ))}
          </List>
        </DrawerContentContainer>
      </Drawer>
    </>
  );
}

/**
 * Header for desktop
 */
function DesktopHeader() {
  return (
    <>
      <Typography variant="h6" noWrap>
        {APP_NAME}
      </Typography>
      <Container>
        <Link href="/recipes">
          <Button>Recipes</Button>
        </Link>
        <Link href="/categories">
          <Button>Categories</Button>
        </Link>
      </Container>
      <Link href="/recipe/add">
        <Button>Add a Recipe</Button>
      </Link>
    </>
  );
}

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
