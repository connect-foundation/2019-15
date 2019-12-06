import styled from 'styled-components';

const childrenMargin = '1rem';

export const ToolsStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
  display: flex;
  background-color: white;
  height: 4rem;
  border-radius: 0.5rem;
  > * {
    margin: ${childrenMargin};
  }
`;
