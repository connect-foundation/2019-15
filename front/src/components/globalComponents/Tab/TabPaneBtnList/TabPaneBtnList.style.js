import styled from 'styled-components';

const tabBtnMargin = '2px';

const tabBtnTopPadding = '8px';

const tabBtnRightPadding = '16px';

export const TabPaneBtnListStyle = styled.div`
  list-style: none;
  margin-left: 2rem;
  @media (max-width: 1000px) {
    margin-left: 1rem;
  }
  @media (max-width: 800px) {
    margin-left: 0;
  }
  margin-top: -2.5rem;
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
  border-radius: 1rem 1rem 0 0;
  @media (max-width: 1100px) {
    font-size: 9px;
  }
`;
