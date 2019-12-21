import styled from 'styled-components';

export const LineStyle = styled.div`
  width: 100%;
  height: 0.3rem;
  background-color: ${(props) => props.theme.geyser};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.7rem 0 0.7rem 0;
  background-clip: content-box;
`;

export const HandlebarStyle = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.theme.tuatara};
  border-radius: 50%;
  z-index: 1;
  position: relative;
  left: ${(props) => props.left}px;
`;

export const SliderStyle = styled.div`
  cursor: pointer;
  width: 10rem;
  position: relative;
`;
