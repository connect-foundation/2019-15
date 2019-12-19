import styled from 'styled-components';

export const VideoSectionWrapper = styled.div`
  margin-top: -1rem;
  display: flex;
  width: 100%;
  height: auto;
  > * {
    width: 100%;
  }
`;

export const WordButtonsWrapper = styled.div`
  max-height: 33rem;
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
  @media (max-width: 1300px) {
    margin-left: 0;
    justify-content: center;
  }
`;
