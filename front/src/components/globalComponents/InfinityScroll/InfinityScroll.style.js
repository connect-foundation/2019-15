import styled from 'styled-components';

const InfinityScrollStyle = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 9px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.darkPink};
    opacity: 0.4;
  }
`;

export default InfinityScrollStyle;
