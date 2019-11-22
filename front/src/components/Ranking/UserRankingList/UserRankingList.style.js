import styled from 'styled-components';

const UserRankingListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 28rem;
  width: 20rem;
  overflow: scroll;
  background-color: ${(props) => props.theme.amour};
`;

export default UserRankingListStyle;
