import styled from 'styled-components';

const TitleStyle = styled.div`
  width: 100%;
  height: 20%;
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
  white-space: nowrap;
  @media (max-width: 700px) {
    margin-top: 2rem;
    margin-bottom: -1rem;
    font-size: 38px;
  }
`;

export default TitleStyle;
