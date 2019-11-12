import styled from 'styled-components';

const ButtonStyle = styled.input.attrs(props=>({
    type:'button',
    value: props.label
}))`
    text-align: center;
    border: 1px solid #EDEEEC;
    border-radius: 1rem;
    width:${props => props.width};
    height:${props => props.height};
    color: #EDEEEC;
    font-size: 7px;
    background-color: ${props => props.theme.buttonColor};
`;

export default ButtonStyle;

