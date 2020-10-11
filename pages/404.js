import React from "react";
import WithHeader from "containers/Header/withHeader";
import Typography from "@material-ui/core/Typography";

import { LoaderWrapper } from "pages/_app";

/**
 * Not Found Page
 */
function NotFoundPage() {
  return (
    <WithHeader
      content={
        <LoaderWrapper>
          <Typography component="h1" variant="h5">
            Page Not Found
          </Typography>
        </LoaderWrapper>
      }
    />
  );
}

export default NotFoundPage;
