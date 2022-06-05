import styled from "styled-components";
import header from "../assets/header.jpg"

const Header = ()=>{

    return(
        <Wrapper>
            <h2>Cabinetmaking</h2>
            <img src={header} />
        </Wrapper>
    )
};

export default Header;

const Wrapper=styled.div`
    margin-top: 60px;

img{//banner
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    height: 350px;
    width: 100%;

}
`
