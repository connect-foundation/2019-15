import styled from 'styled-components';

const ImageStyle = styled.img.attrs(props => ({src: props.src}))`
  width: ${props => (props.width ? props.width : '10%')};
  height: ${props => (props.height ? props.height : '10%')};
`;

export default ImageStyle
