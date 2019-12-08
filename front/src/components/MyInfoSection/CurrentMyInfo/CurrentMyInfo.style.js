import styled from 'styled-components';

const CurrentMyInfoStyle = styled.section`
  margin-top: -1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    display: flex;
    flex-direction: column;
  }
  & > div > span {
    margin-left: 1rem;
    white-space: nowrap;
  }
  & > div > span.nickname {
    font-size: 1.2rem;
  }
  @media (max-width: 1100px) {
    flex-direction: column;
    & > div > span {
      margin-left: 0;
      font-size: 13px;
    }
    & > div > span.nickname {
      margin-top: 0.5rem;
      font-size: 15px;
    }
  }
`;

export default CurrentMyInfoStyle;
