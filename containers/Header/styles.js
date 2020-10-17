import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { grey } from "@material-ui/core/colors";

export const StyledAppBar = styled(AppBar)`
  align-items: center;
`;

export const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;

  .MuiButtonBase-root {
    color: #fff;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: calc(20px + 5vw);
  flex-grow: 1;
`;

export const DrawerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: clamp(250px, 60vw, 350px);
  height: 100%;
`;

export const StyledList = styled(List)`
  width: 100%;
`;

export const StyledDivider = styled(Divider)`
  align-self: stretch;
`;

export const SpacerGrow = styled.div`
  flex-grow: 1;
`;

export const Spacer = styled.div`
  width: ${({ theme, $amount }) => theme.spacing($amount || 1)}px;
`;

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 150px min-content;
  column-gap: ${({ theme }) => theme.spacing(1)}px;
  align-items: center;
`;

export const StyledSwitch = styled(Switch)`
  color: ${grey[200]};

  .Mui-checked {
    color: ${grey[400]};
  }

  .Mui-checked + .MuiSwitch-track {
    background-color: ${grey[400]};
  }
`;

export const StyledTypography = styled(Typography)`
  ${({ $isDark }) => $isDark && `color: ${grey[700]}`};
`;
