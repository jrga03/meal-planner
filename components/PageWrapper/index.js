import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import MuiLink from "@material-ui/core/Link";
import { isMobileOnly } from "react-device-detect";

import { ContentWrapper, FooterWrapper, StyledSpacer } from "components/PageWrapper/styles";
import Header from "containers/Header";

function PageWrapper({ children, withHeader, withFooter, HeaderProps, maxWidth, fixed, disableGutters, component }) {
  return (
    <>
      {withHeader && <Header { ...HeaderProps } />}
      <ContentWrapper maxWidth={ maxWidth } fixed={ fixed } disableGutters={ disableGutters } component={ component }>
        {children}
      </ContentWrapper>
      {withFooter && (
        <FooterWrapper component="footer">
          <Link href="/privacy-policy" passHref>
            <MuiLink color="textSecondary" display="inline">
              Privacy
            </MuiLink>
          </Link>
          <StyledSpacer $amount={ 2 } />
          <Link href="/terms-and-conditions" passHref>
            <MuiLink color="textSecondary" display="inline">
              Terms
            </MuiLink>
          </Link>
        </FooterWrapper>
      )}
    </>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node,
  withHeader: PropTypes.bool,
  withFooter: PropTypes.bool,
  HeaderProps: PropTypes.shape({
    title: PropTypes.string,
    startNode: PropTypes.node,
    endNode: PropTypes.node
  }),
  maxWidth: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs", false]),
  fixed: PropTypes.bool,
  disableGutters: PropTypes.bool,
  component: PropTypes.elementType
};

PageWrapper.defaultProps = {
  withHeader: true,
  withFooter: !isMobileOnly,
  HeaderProps: {},
  maxWidth: "lg",
  fixed: false,
  disableGutters: false,
  component: "div"
};

export default PageWrapper;
