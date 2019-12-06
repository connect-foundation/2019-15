import styled from 'styled-components';

export const NicknameChangeContainerStyle = styled.div`
  width: 100%;
`;

export const ResultTextStyle = styled.p`
  word-break: break-all;
  font-size: 13px;
  text-align: center;
  color: ${(props) => (props.children.length < 2 ? 'white' : 'black')};
`;
