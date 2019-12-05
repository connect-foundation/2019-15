import styled from 'styled-components';

const ContentSectionStyle = styled.section`
  background-color: ${(props) => props.theme.paleRose};
  padding: 1rem;
  flex-basis: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 3rem 2.5rem 0 2.5rem;
  @media (max-width: 900px) {
    margin: 3rem 0.5rem 0 0.5rem;
  }
  border: 2px solid white;
  border-radius: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentSectionTitleStyle = styled.span`
  position: relative;
  top: -3.65rem;
  left: -1.1rem;
  align-self: flex-start;
  padding: 0.5rem 2rem;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem 1rem 0 0;
  border: 2px solid white;
  white-space: nowrap;
  border-bottom: 0;
  background-color: ${(props) => props.theme.paleRose};
  font-size: large;
  @media (max-width: 1100px) {
    top: -3.2rem;
    font-size: 13px;
    padding: 0.5rem 1rem;
  }
`;

export { ContentSectionStyle, ContentSectionTitleStyle };
