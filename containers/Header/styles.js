import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

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

export const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 56px);
  padding-top: 56px;

  @media screen and (orientation: landscape) {
    height: calc(100% - 48px);
    padding-top: 48px;
  }

  @media screen and (min-width: 600px) {
    height: calc(100% - 64px);
    padding-top: 64px;
  }
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
