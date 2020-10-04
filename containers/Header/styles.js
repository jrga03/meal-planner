import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export const StyledAppBar = styled(AppBar)`
  align-items: center;
`;

export const StyledToolbar = styled(Toolbar)`
  max-width: 960px;
  width: 100vw;
  padding-right: 5px;
  padding-left: 5px;
  justify-content: space-between;

  .MuiButtonBase-root, .MuiTypography-root {
    color: #fff;
  }

  .grow {
    flex-grow: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: calc( 20px + 5vw );
  flex-grow: 1;
`;

export const DrawerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
