import styled from 'styled-components';

const InnerSectionStyle = styled.section`
  background-color: white;
  padding: 1rem;
  border-radius: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const InnerSectionTitleStyle = styled.span`
  position: relative;
  top: -3rem;
  left: -1rem;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem 1rem 0 0;
  white-space: nowrap;
  background-color: white;
  font-size: 13px;
`;

export { InnerSectionStyle, InnerSectionTitleStyle };
