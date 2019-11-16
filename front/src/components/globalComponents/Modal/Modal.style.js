import styled from 'styled-components';

const ModalStyle = styled.div`
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

export default ModalStyle;
