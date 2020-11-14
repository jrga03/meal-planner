import styled, { css } from "styled-components";
import TableRow from "@material-ui/core/TableRow";
import { clampHeight } from "containers/AddRecipe/styles";

const imageDimensions = css`
  width: 100%;
  height: ${({ theme }) => clampHeight(theme)};
`;

export const StyledPicture = styled.picture`
  ${imageDimensions}
`;

export const StyledImg = styled.img`
  ${imageDimensions}
`;

export const Content = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)}px;

  .tag {
    text-transform: capitalize;
  }
`;

export const SpacerHeight = styled.div`
  height: ${({ theme, $amount }) => theme.spacing($amount || 1)}px;
`;

export const PrepTimeWrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  justify-items: center;
`;

export const PrepTimes = styled.div`
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;
