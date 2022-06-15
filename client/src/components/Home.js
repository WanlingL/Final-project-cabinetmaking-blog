import styled from "styled-components";
import Header from "./Header";
import Blog from "./Blog";

const Home =()=>{

    return(
        <Wrapper>

            <Header />

            <MainHome>
                <Blog />
            </MainHome>

        </Wrapper>
    )
};

export default Home;

const Wrapper=styled.div`
    width: 85vw;
    height: 100vh;

`
const MainHome = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

`