import styled from 'styled-components';

const tabBtnMargin = '2px';

const tabBtnTopPadding = '8px';

const tabBtnRightPadding = '16px';

export const TabPaneBtnListStyle = styled.div`
  list-style: none;
`;

export const TabButton = styled.button`
  cursor: pointer;
  display: inline-block;
  margin-right: ${tabBtnMargin};
  background-color: ${(props) =>
    props.active ? props.activeTabColor : props.inActiveTabColor};
  border: ${tabBtnMargin};
  padding: ${tabBtnTopPadding} ${tabBtnRightPadding};
  outline: none;
`;
