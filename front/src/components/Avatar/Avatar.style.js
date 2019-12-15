import styled from 'styled-components';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const AvatarImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const AvatarChoiceStyle = styled(FlexRowStyle)`
  justify-content: center;
  margin: 5px 0;
`;

export const LeftBtn = styled(ButtonStyle)`
  margin-right: 5px;
`;
export const RightBtn = styled(ButtonStyle)`
  margin-left: 5px;
`;
