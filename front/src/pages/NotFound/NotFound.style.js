import styled from 'styled-components';
import { FlexColumnStyle } from '../../components/globalComponents/Container/Flex.style';

const NotFoundStyle = styled(FlexColumnStyle)`
  align-items: center;
  & img {
    width: fit-content;
    height: fit-content;
  }
`;

export default NotFoundStyle;
