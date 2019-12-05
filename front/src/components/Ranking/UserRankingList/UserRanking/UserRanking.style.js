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

  @media (max-width: 700px) {
    > * {
      margin-left: 0.6rem;
    }
    > div > h3 {
      width: 1rem;
    }
    > div > p {
      font-size: 13px;
      width: 3rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

export default UserRankingStyle;
