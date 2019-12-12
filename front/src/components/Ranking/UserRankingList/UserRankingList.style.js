import styled from 'styled-components';

const UserRankingListStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  @media (max-width: 1100px) {
    width: 12rem;
  }
  height: 28rem;
  border-radius: 0 1rem 1rem 1rem;
  background-color: #fff;
`;

export default UserRankingListStyle;
