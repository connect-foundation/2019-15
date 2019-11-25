import styled from 'styled-components';

const colorPickerWidth = '10rem';

const colorBoxMargin = '5px';

export const ColorPickerStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${colorPickerWidth};
`;

export const ColorBoxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: ${colorBoxMargin};
  }
`;

export const ColorInfo = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin: ${colorBoxMargin};
  }
`;
