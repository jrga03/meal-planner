import React, { useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LinkIcon from "@material-ui/icons/Link";
import { useSnackbar } from "notistack";
import { usePopupState, bindTrigger, bindPopover } from "material-ui-popup-state/hooks";
import Skeleton from "@material-ui/lab/Skeleton";

// Components
import PageWrapper from "components/PageWrapper";
import { SkeletonPhoto } from "containers/AddRecipe/styles";
import { Content, SpacerHeight, PrepTimeWrapper, PrepTimes, TitleWrapper } from "containers/Recipe/styles";

// Utilities
import Fetch from "utils/request";
import { getCloudinaryImageUrl } from "utils/cloudinary";
import { getDomain } from "utils/urlHelper";
import { getDurationDisplay } from "utils/recipe";
import { UserContext } from "utils/user";

// Dynamic components
const Table = dynamic(() => import("@material-ui/core/Table"));
const TableBody = dynamic(() => import("@material-ui/core/TableBody"));
const TableCell = dynamic(() => import("@material-ui/core/TableCell"));
const TableHead = dynamic(() => import("@material-ui/core/TableHead"));
const TableRow = dynamic(() => import("@material-ui/core/TableRow"));
const StyledImg = dynamic(() => import("containers/Recipe/styles").then((mod) => mod.StyledImg));

function Recipe() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const popupState = usePopupState({ variant: "popover", popupId: "optionsMenu" });

  const { data, error } = useSWR(() => (id ? `/api/recipe/${id}` : null), Fetch);

  useEffect(() => {
    if (popupState.isOpen) {
      router.prefetch(`/recipe/${id}/edit`);
    }
  }, [popupState.isOpen, router, id]);

  if (error) {
    enqueueSnackbar("Recipe page not found.");
    router.replace("/recipes");
  }

  const domain = getDomain(data?.source);
  const isAuthor = data?.author.id === user?.sub;

  const handleDelete = () => {
    popupState.close();
    // TODO: Delete endpoint
  };

  return (
    <PageWrapper maxWidth="sm">
      {!data && (
        <>
          <SkeletonPhoto variant="rect" />
          <Content>
            <Skeleton height={ 56 } width="60%" />
            <Skeleton height={ 100 } />
            <Skeleton height={ 1 } />
            <Skeleton height={ 150 } />
          </Content>
        </>
      )}
      {data && (
        <>
          {data.photo && (
            <picture>
              <StyledImg src={ getCloudinaryImageUrl(data.photo) } alt={ data.title } />
            </picture>
          )}
          <Content>
            <TitleWrapper>
              <Typography component="h1" variant="h4">
                {data.title}
              </Typography>

              <IconButton aria-label="options" aria-haspopup="true" { ...bindTrigger(popupState) }>
                <MoreVertIcon />
              </IconButton>
              <Popover
                { ...bindPopover(popupState) }
                anchorOrigin={ {
                  vertical: "center",
                  horizontal: "right"
                } }
                transformOrigin={ {
                  vertical: "top",
                  horizontal: "right"
                } }
              >
                <List>
                  <Link href={ `/recipe/${id}/edit` } prefetch={ false }>
                    <ListItem button onClick={ popupState.close }>
                      <ListItemText>Edit</ListItemText>
                    </ListItem>
                  </Link>
                  {isAuthor && (
                    <ListItem button onClick={ handleDelete }>
                      <ListItemText primaryTypographyProps={ { color: "error" } }>Delete</ListItemText>
                    </ListItem>
                  )}
                </List>
              </Popover>
            </TitleWrapper>

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

            <SpacerHeight $amount={ 2 } />
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
                      <TableRow key={ `${row.ingredient}_${index}` } hover>
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
                <Typography display="inline" variant="subtitle2">
                  Tags:{" "}
                </Typography>
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
