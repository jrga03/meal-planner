import styled from "styled-components";
import Container from "@material-ui/core/Container";
import { Spacer } from "containers/Header/styles";

export const ContentWrapper = styled(Container)`
  flex-grow: 1;
  padding-top: 56px;
  padding-left: 0;
  padding-right: 0;

  @media screen and (orientation: landscape) {
    padding-top: 48px;
  }

  @media screen and (min-width: 600px) {
    padding-top: 64px;
  }
`;

export const StyledSpacer = styled(Spacer)`
  display: inline-block;
`;

export const FooterWrapper = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`;
