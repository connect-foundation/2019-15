import styled from 'styled-components';
import ButtonStyle from '../../globalComponents/Button/Button.style';

const DoneButtonStyle = styled(ButtonStyle)`
  width: 3rem;
  height: 1.5rem;
  margin-left: auto;
  margin-right: 1rem;
  border: 1px solid ${(props) => props.theme.grayNurse};
`;

export default DoneButtonStyle;
