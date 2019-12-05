import styled from 'styled-components';

const UserRankingListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 28rem;
  width: 16rem;
  margin-left: 2rem;
  @media (min-width: 1200px) and (max-width: 1300px) {
    width: 14.5rem;
  }
  @media (min-width: 1100px) and (max-width: 1200px) {
    width: 12rem;
  }
  @media (min-width: 1000px) and (max-width: 1100px) {
    width: 10.5rem;
  }
  @media (min-width: 800px) and (max-width: 1000px) {
    margin-left: 1rem;
    width: 9.5rem;
  }
  @media (max-width: 800px) {
    margin-left: 0;
    width: 9rem;
  }
  overflow: scroll;
  background-color: ${(props) => props.theme.amour};
`;

export default UserRankingListStyle;
