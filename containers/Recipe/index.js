import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import MuiLink from "@material-ui/core/Link";
import LinkIcon from "@material-ui/icons/Link";
import { useSnackbar } from "notistack";

// Components
import PageWrapper from "components/PageWrapper";
// import { SkeletonPhoto, SkeletonField, SkeletonDivider } from "containers/AddRecipe/styles";
import { Content, SpacerHeight, PrepTimeWrapper, PrepTimes } from "containers/Recipe/styles";

// Utilities
import Fetch from "utils/request";
import { getCloudinaryImageUrl } from "utils/cloudinary";
import { getDomain } from "utils/urlHelper";
import { getDurationDisplay } from "utils/recipe";

// Dynamic components
const Table = dynamic(() => import("@material-ui/core/Table"));
const TableBody = dynamic(() => import("@material-ui/core/TableBody"));
const TableCell = dynamic(() => import("@material-ui/core/TableCell"));
const TableHead = dynamic(() => import("@material-ui/core/TableHead"));
const TableRow = dynamic(() => import("@material-ui/core/TableRow"));
const StyledImg = dynamic(() => import("containers/Recipe/styles").then((mod) => mod.StyledImg));

function Recipe() {
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();

  const { data, error } = useSWR(() => (id ? `/api/recipe/${id}` : null), Fetch);

  if (error) {
    enqueueSnackbar("Recipe page not found.")
    router.replace("/recipes");
  }

  const domain = getDomain(data?.source);

  return (
    <PageWrapper maxWidth="sm">
      {/* <>
        <SkeletonPhoto variant="rect" />
      </> */}
      {data && (
        <>
          {data.photo && (
            <picture>
              <StyledImg src={ getCloudinaryImageUrl(data.photo) } alt={ data.title } />
            </picture>
          )}
          <Content>
            <Typography component="h1" variant="h4">
              {data.title}
            </Typography>

            {data.source && domain && (
              <>
                <SpacerHeight $amount={ 2 } />
                <Chip
                  icon={ <LinkIcon /> }
                  label={ domain }
                  clickable
                  component="a"
                  href={ data.source }
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </>
            )}

            {data.description && (
              <>
                <SpacerHeight $amount={ 2 } />
                <Typography variant="body2" paragraph>
                  {data.description}
                </Typography>
              </>
            )}

            <Divider />
            <SpacerHeight />
            <PrepTimeWrapper>
              <PrepTimes>
                <Typography variant="subtitle2" align="center">
                  Prep Time
                </Typography>
                <Typography variant="h5" align="center">
                  {getDurationDisplay(data["prep-hours"], data["prep-minutes"])}
                </Typography>
              </PrepTimes>
              <PrepTimes>
                <Typography variant="subtitle2" align="center">
                  Cook Time
                </Typography>
                <Typography variant="h5" align="center">
                  {getDurationDisplay(data["cook-hours"], data["cook-minutes"])}
                </Typography>
              </PrepTimes>
            </PrepTimeWrapper>

            {data?.ingredients.length > 0 && (
              <>
                <SpacerHeight />
                <Divider />
                <SpacerHeight $amount={ 3 } />
                <Table size="small" aria-label="ingredients table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={ 3 }>
                        <Typography component="h3" variant="h6">
                          <strong>Ingredients</strong>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.ingredients.map((row, index) => (
                      <TableRow key={ row.ingredient || index } hover>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.unit}</TableCell>
                        <TableCell>
                          <strong>{row.ingredient}</strong>
                          {row.note && (
                            <>
                              {" "}
                              <em>{row.note}</em>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            <SpacerHeight $amount={ 4 } />
            <Typography component="h3" variant="h6" gutterBottom>
              <strong>Directions</strong>
            </Typography>
            <Typography variant="body1" paragraph style={ { whiteSpace: "pre-line" } }>
              {data.directions}
            </Typography>

            <SpacerHeight $amount={ 2 } />
            <Divider />
            <SpacerHeight $amount={ 2 } />
            {data.tags.length > 0 && (
              <>
                <Typography display="inline" variant="subtitle2">Tags: </Typography>
                {data.tags.map((tag, index) => (
                  <React.Fragment key={ tag }>
                    {index === 0 || ", "}
                    <Link href={ { pathname: "/recipes", query: { tag } } } prefetch={ false } passHref>
                      <MuiLink color="textSecondary" display="inline">
                        {tag}
                      </MuiLink>
                    </Link>
                  </React.Fragment>
                ))}
              </>
            )}
          </Content>
        </>
      )}
    </PageWrapper>
  );
}

export default Recipe;
