import styled from 'styled-components';
import { FlexRowStyle } from '../../globalComponents/Container/Flex.style';

const UserListStyle = styled(FlexRowStyle)`
  width: 50%;
  height: 90%;
  background-color: orange;
  margin: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

export default UserListStyle;
