import styled from 'styled-components';

const childrenMargin = '0.5rem';

const DrawingPlayGroundStyle = styled.div`
  background-color: white;
  > * {
    margin: ${childrenMargin};
  }
`;

export default DrawingPlayGroundStyle;
