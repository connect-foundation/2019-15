import styled from 'styled-components';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  border: 1px solid lightgray;
  min-width: 20rem;
  min-height: 10rem;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ModalDivStyle = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AlarmModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  border: 1px solid lightgray;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export { ModalStyle, ModalDivStyle, AlarmModalStyle };
