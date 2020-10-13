import React from "react";
import PropTypes from "prop-types";

import Header from "containers/Header";
import { ContentWrapper } from "containers/Header/styles";

function WithHeader({ content, HeaderProps }) {
  return (
    <>
      <Header { ...HeaderProps } />
      <ContentWrapper>{content}</ContentWrapper>
    </>
  );
}

WithHeader.propTypes = {
  content: PropTypes.node.isRequired,
  HeaderProps: PropTypes.shape({
    title: PropTypes.string,
    startNode: PropTypes.node,
    endNode: PropTypes.node
  })
};

export default WithHeader;
