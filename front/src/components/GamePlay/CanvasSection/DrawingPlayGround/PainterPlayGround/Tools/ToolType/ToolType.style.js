import styled from 'styled-components';

export const ToolTypeStyle = styled.div`
  margin: 0;
`;

export const ToolTypeSelectionStyle = styled.div`
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-around;
  width: 9rem;
  > * {
    margin: 2px;
  }
`;
