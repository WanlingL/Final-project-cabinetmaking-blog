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
    width: 80vw;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-content: center;

`
const MainHome = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;

`