import styled from 'styled-components';

const CurrentMyInfoStyle = styled.section`
  display: flex;
  flex-direction: row;
  height: 40%;
  width: 100%;
  & > div {
    width: 100%;
    margin: 0 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  & > div > span {
    margin: 0.5rem;
  }
  & > div > span.nickname {
    font-size: 1.2rem;
  }
`;

export default CurrentMyInfoStyle;
