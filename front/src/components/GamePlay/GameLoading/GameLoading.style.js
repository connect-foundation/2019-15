import styled from 'styled-components';

const canvasHeight = '470px';

const FullScreen = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;
  height: ${canvasHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export default FullScreen;
