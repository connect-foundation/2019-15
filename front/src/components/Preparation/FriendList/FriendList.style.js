import styled from 'styled-components';

export const FriendListStyle = styled.div`
  width: 15rem;
  height: 29rem;
  background-color: ${({ theme }) => theme.paleRose};
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  border-radius: 1rem;
  border: solid 2px white;
  padding: 1rem 0;
`;
