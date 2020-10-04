import React from "react";
import Typography from "@material-ui/core/Typography";

import { LoaderWrapper } from "pages/_app";

/**
 * Not Found Page
 */
function NotFoundPage() {
  return (
    <LoaderWrapper>
      <Typography component="h1" variant="h5">
        Page Not Found
      </Typography>
    </LoaderWrapper>
  );
}

NotFoundPage.displayName = "NotFoundPage";

export default NotFoundPage;
