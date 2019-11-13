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

const ModalStyle = styled.div`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  border: 1px solid lightgray;
  width: 10rem;
  height: 10rem;
  background-color: white;
  border-radius: 1rem;

  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export { BackgroundModalStyle, ModalStyle };
