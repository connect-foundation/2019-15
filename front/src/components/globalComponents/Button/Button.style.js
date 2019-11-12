import styled from 'styled-components';

const ButtonStyle = styled.input.attrs(props=>({
    type:'button',
    value: props.value
}))`
    text-align: center;
    border: 1px solid #EDEEEC;
    border-radius: 1rem;
    width:4rem;
    height:2rem;
    color: #EDEEEC;
    font-size: 7px;
    background-color: ${props => props.theme.buttonColor};
    &:hover{
        background-color: #15062C;
        cursor: pointer;
    }
`;

export default ButtonStyle;

