import styled from 'styled-components';

const BackgroundModalStyle = styled.div`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default BackgroundModalStyle;
