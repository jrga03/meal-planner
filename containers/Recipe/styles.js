import styled from "styled-components";
import { clampHeight } from "containers/AddRecipe/styles";

export const StyledImg = styled.img`
  width: 100%;
  height: ${({ theme }) => clampHeight(theme)};
`;

export const Content = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)}px;
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
