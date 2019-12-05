import styled from 'styled-components';

const UserRankingStyle = styled.div`
  height: 5rem;
  width: 10rem;
  display: flex;
  align-items: center;
  > * {
    margin: 1rem;
  }
  > div > p {
    width: 9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default UserRankingStyle;
