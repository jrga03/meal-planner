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
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import Skeleton from "@material-ui/lab/Skeleton";
import MenuIcon from "@material-ui/icons/Menu";
import DarkModeIcon from "@material-ui/icons/NightsStay";
import Search from "@material-ui/icons/Search";

import { DrawerContentContainer, StyledList, StyledDivider, SpacerGrow } from "containers/Header/styles";
import { NAVIGATION_ITEMS } from "containers/Header/constants";

import { createLoginUrl } from "utils/urlHelper";

/**
 * ListItem with Link
 */
function ListItemLink({ Icon, primary, href, onClick }) {
  const router = useRouter();
  const selected = router.asPath === href;
  const color = selected ? "primary" : "inherit";

  const component = (
    <ListItem button selected={ selected } onClick={ onClick }>
      <ListItemIcon>
        <Icon color={ color } />
      </ListItemIcon>
      <ListItemText primary={ primary } primaryTypographyProps={ { color } } />
    </ListItem>
  );

  if (!href) {
    return <li>{component}</li>;
  }

  return (
    <li>
      <Link href={ href }>{component}</Link>
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
      <SpacerGrow />
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
function MobileHeader({ auth, isDark, setPaletteType, title, startNode, endNode, onClickAddRecipe }) {
  const router = useRouter();
  const [drawerStatus, setDrawerStatus] = useState(false);

  if (startNode || endNode) {
    return <CustomHeader title={ title } startNode={ startNode } endNode={ endNode } />;
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

  const handleListItemClick = (href) => () => {
    setDrawerStatus(false);
    if (!href) {
      onClickAddRecipe();
    }
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
      <IconButton edge="start" color="inherit" aria-label="Menu" onClick={ handleToggleDrawer(true) }>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
      <SpacerGrow />
      {/* TODO: */}
      {/* <Link href="/search">
        <IconButton edge="end" color="inherit" aria-label="Search">
          <Search />
        </IconButton>
      </Link> */}
      {/* TODO: */}
      <Drawer
        open={ drawerStatus }
        onClose={ handleToggleDrawer(false) }
        ModalProps={ {
          keepMounted: true // Better open performance on mobile.
        } }
      >
        <DrawerContentContainer>
          {auth.user && (
            <StyledList>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={ auth.user.name } src={ auth.user.picture } />
                </ListItemAvatar>
                <ListItemText
                  primary={ auth.user.given_name || auth.user.name }
                  primaryTypographyProps={ { noWrap: true } }
                />
              </ListItem>
            </StyledList>
          )}
          {auth.loading && (
            <StyledList>
              <ListItem>
                <ListItemAvatar>
                  <Skeleton variant="circle" width={ 40 } height={ 40 } />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton width="100%" height="24px" />
                </ListItemText>
              </ListItem>
            </StyledList>
          )}
          {NAVIGATION_ITEMS.map(({ title, items }) => (
            <React.Fragment key={ title }>
              <StyledList component="nav" subheader={ <ListSubheader>{title}</ListSubheader> }>
                {items.map((item) => (
                  <ListItemLink key={ item.primary } onClick={ handleListItemClick(item.href) } { ...item } />
                ))}
              </StyledList>
              <StyledDivider variant="middle" />
            </React.Fragment>
          ))}
          <StyledList subheader={ <ListSubheader>Settings</ListSubheader> }>
            <ListItem>
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <ListItemText primary="Dark mode" />
              <ListItemSecondaryAction>
                <Switch color="primary" edge="end" checked={ isDark } onChange={ handleToggle(!isDark) } />
              </ListItemSecondaryAction>
            </ListItem>
          </StyledList>
          <StyledList>
            <ListItem>
              <Link href="/privacy-policy" passHref>
                <MuiLink color="textSecondary" display="inline">
                  Privacy
                </MuiLink>
              </Link>
              <SpacerGrow $amount={ 2 } />
              <Link href="/terms-and-conditions" passHref>
                <MuiLink color="textSecondary" display="inline">
                  Terms
                </MuiLink>
              </Link>
            </ListItem>
          </StyledList>
          <SpacerGrow />
          <StyledList>
            <ListItem>
              {auth.loading ? (
                <Skeleton width="100%" variant="rect">
                  <Button>Loading...</Button>
                </Skeleton>
              ) : auth.user ? (
                <Button fullWidth href="/api/auth/logout">
                  Logout
                </Button>
              ) : (
                <Button fullWidth variant="contained" href={ createLoginUrl(router.pathname) }>
                  Login
                </Button>
              )}
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
  endNode: PropTypes.node,
  auth: PropTypes.shape({
    user: PropTypes.object,
    loading: PropTypes.bool
  }).isRequired,
  onClickAddRecipe: PropTypes.func.isRequired
};

MobileHeader.defaultProps = {
  startNode: undefined,
  endNode: undefined
};

export default MobileHeader;
