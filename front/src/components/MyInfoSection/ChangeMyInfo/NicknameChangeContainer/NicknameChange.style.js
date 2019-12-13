import styled from 'styled-components';

const childrenMargin = '1px';

export const NicknameChangeStyle = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin: ${childrenMargin};
  }
`;
