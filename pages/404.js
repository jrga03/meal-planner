import React from "react";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { LoaderWrapper } from "pages/_app";

/**
 * Not Found Page
 */
function NotFoundPage() {
  const handleBack = () => Router.back();

  return (
    <LoaderWrapper>
      <Typography component="h1" variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Button onClick={ handleBack } variant="contained">
        Go back
      </Button>
    </LoaderWrapper>
  );
}

export default NotFoundPage;
