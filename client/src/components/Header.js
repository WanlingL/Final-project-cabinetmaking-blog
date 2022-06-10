import styled from "styled-components";
import header from "../assets/header.jpg"

const Header = ()=>{

    return(
        <Wrapper>

            <Title>
                <h1>Cabinetmaking & Furniture Finishing </h1>
                <h2>Blog</h2>
            </Title>

            <Image><img src={header} /></Image>
        </Wrapper>
    )
};

export default Header;

const Wrapper=styled.div`
    margin-top: 40px;

img{//banner
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    height: 400px;
    width: 100%;
}
`
const Title = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #444;

h1{
    font-size: 20px;
    position: relative;
    top: 15px; 
}

h2{
    font-size: 80px;
    text-align: center;
    font-family: 'Quattrocento', serif;
    position: relative;
    top: 25px;    
}
`
const Image = styled.div`

`
