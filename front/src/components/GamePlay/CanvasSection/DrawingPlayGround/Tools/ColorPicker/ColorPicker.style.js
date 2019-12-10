import styled from 'styled-components';

const colorPickerWidth = '15rem';

const colorBoxMargin = '6px';

export const ColorPickerStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
`;

export const ColorBoxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 7rem;
  > * {
    margin: 3px ${colorBoxMargin};
  }
`;

export const ColorInfo = styled.div`
  display: flex;
  justify-content: center;
  font-size: small;
  > * {
    margin: ${colorBoxMargin};
  }
`;
