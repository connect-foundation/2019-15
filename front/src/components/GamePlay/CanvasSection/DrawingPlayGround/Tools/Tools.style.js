import styled from 'styled-components';

export const ToolsStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
  display: flex;
  background-color: white;
  height: 6rem;
  border-radius: 0.5rem;
  text-align: center;
  > * {
    margin: 0.5rem 1rem;
  }
`;

export const ToolTitleStyle = styled.div`
  margin: -0.3rem 0 0.3rem 0;
  font-size: 10px;
`;

export const VerticalAlignDiv = styled.div`
  display: table;
  width: 100%;
  height: 4rem;
  > * {
    display: table-cell;
    vertical-align: middle;
  }
`;
