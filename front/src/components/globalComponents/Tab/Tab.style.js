import styled from 'styled-components';

export const TabStyle = styled.div``;

export const TabContentStyle = styled.div`
  display: flex;
  > * {
    display: none;
  }

  & > div:nth-child(${(props) => props.activeTabPaneIdx + 1}) {
    display: block;
  }
`;
