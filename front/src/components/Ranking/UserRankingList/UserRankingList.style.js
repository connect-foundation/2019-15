import styled from 'styled-components';

const UserRankingListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 28rem;
  overflow: hidden;
  border: solid 2px white;
  border-radius: 0 1rem 1rem 1rem;
  background-color: white;
  padding-right: 1rem;
  :hover {
    overflow-y: scroll;
    padding-right: 0;
  }
`;

export default UserRankingListStyle;
