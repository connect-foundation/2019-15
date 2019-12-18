import styled from 'styled-components';

const colorBoxSize = '1rem';

const ColorBoxStyle = styled.div`
  box-sizing: border-box;
  display: inline-block;
  background-color: ${(props) => props.rgb};
  border: ${(props) => (props.rgb === '#FFFFFF' ? '1px solid #c0c0c0' : '')};
  border-radius: 0.2rem;
  width: ${colorBoxSize};
  height: ${colorBoxSize};
  cursor: pointer;
`;

export default ColorBoxStyle;
