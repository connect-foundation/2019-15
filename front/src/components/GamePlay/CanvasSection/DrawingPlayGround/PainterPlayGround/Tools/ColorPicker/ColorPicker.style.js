import styled from 'styled-components';

const colorBoxMargin = '4px';

export const ColorPickerStyle = styled.div`
  border: rgba(105, 105, 105, 0.5) 0.5px solid;
  border-radius: 0.3rem;
`;

export const ColorBoxList = styled.div`
  width: 7rem;
  display: grid;
  justify-content: space-around;
  grid-template-columns: auto auto auto auto;
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
