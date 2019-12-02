import styled from 'styled-components';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const AnchorStyle = styled(FlexRowStyle)`
  width: 100%;
  height: 5rem;
  justify-content: center;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.Pumice}};
`;

export const AnchorImageStyle = styled.img`
  width: 4.5rem;
  height: 80%;
`;

export const AnchorLinkText = styled.div`
  width: 60%;
  height: 100%;
  font-size: 17px;
  line-height: 5rem;
  text-align: center;
`;

export const AnchorCopyButton = styled(ButtonStyle)`
  width: 5rem;
  height: 3rem;
  font-size: 20px;
`;
