import styled from 'styled-components';

const ImageStyle = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 200px;
  height: 50px;
`;

export default ImageStyle;
