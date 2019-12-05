import styled from 'styled-components';

const ContentSectionStyle = styled.section`
  background-color: ${(props) => props.theme.paleRose};
  margin: 2rem 2.5rem 0 2.5rem;
  @media (max-width: 700px) {
    margin: 2rem 0.5rem 0 0.5rem;
  }
  padding: 1rem;
  padding-bottom: 2rem;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 2px solid white;
  border-radius: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentSectionTitleStyle = styled.span`
  position: relative;
  top: -3.65rem;
  left: -1.1rem;
  padding: 0.5rem 2rem;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem 1rem 0 0;
  border: 2px solid white;
  white-space: nowrap;
  border-bottom: 0;
  background-color: ${(props) => props.theme.paleRose};
  font-size: large;
`;

export { ContentSectionStyle, ContentSectionTitleStyle };
