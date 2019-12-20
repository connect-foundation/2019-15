import styled from 'styled-components';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const AnchorStyle = styled(FlexRowStyle)`
  width: 74rem;
  height: 5rem;
  justify-content: center;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.paleRose};
  margin: 1rem 0rem;
  border: solid 2px white;
  border-radius: 1rem;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

export const AnchorCopyButton = styled(ButtonStyle)`
  width: 5rem;
  height: 3rem;
  font-size: 20px;
`;

export const CopyTextArea = styled.textarea`
  width: 10px;
  height: 10px;
  z-index: -10;
`;
