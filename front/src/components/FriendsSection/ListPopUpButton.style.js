import styled from 'styled-components';
import ButtonStyle from '../globalComponents/Button/Button.style';

const ListPopUpButtonStyle = styled(ButtonStyle)`
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  width: 8rem;
  height: 3rem;
  font-size: 15px;
  background-color: ${(props) => props.theme.pink};
  &:hover {
    background-color: ${(props) => props.theme.seaPink};
  }
`;

export default ListPopUpButtonStyle;
