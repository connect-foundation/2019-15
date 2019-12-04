import styled from 'styled-components';

const ButtonContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default ButtonContainerStyle;
