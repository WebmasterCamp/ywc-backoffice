import styled from "styled-components";

export const Padding = styled.div`
  padding: 20px;
`;

export const applyBoxShadow = Comp => {
  return styled(Comp)`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;
};
