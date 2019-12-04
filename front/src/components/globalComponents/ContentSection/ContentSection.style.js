import styled from 'styled-components';

const ContentSectionStyle = styled.section`
  margin: 0 0 1.5rem 0;
  padding: 1rem;
  padding-bottom: 2rem;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 2px solid ${(props) => props.theme.dimStormBrain};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentSectionTitleStyle = styled.span`
  position: relative;
  left: 1rem;
  top: -2rem;
  padding: 0.5rem 1rem;
  width: fit-content;
  height: fit-content;
  background-color: white;
  font-size: large;
`;

export { ContentSectionStyle, ContentSectionTitleStyle };
