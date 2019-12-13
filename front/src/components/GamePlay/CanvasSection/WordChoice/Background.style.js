import styled from 'styled-components';

const canvasSize = { width: '760px', height: '470px' };

const BackgroundStyle = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 3.5rem;
  margin-left: 0.5rem;
  height: ${canvasSize.height};
  width: ${canvasSize.width};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 0.5rem;
`;

export default BackgroundStyle;
