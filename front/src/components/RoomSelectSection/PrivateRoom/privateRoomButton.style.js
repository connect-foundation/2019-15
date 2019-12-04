import styled from 'styled-components';
import Button from 'components/globalComponents/Button/Button.style';

const PrivateRoomButton = styled(Button)`
  white-space: nowrap;
  min-width: 14rem;
  width: 50%;
  height: 5rem;
  font-size: 2.5rem;
  margin-left: 10px;
  margin-right: 10px;
  margin-top : 4rem;
  @media (max-width: 700px) {
    height: 4rem;
    font-size: 30px;
    min-width: 12rem;
  }
`;

export default PrivateRoomButton;
