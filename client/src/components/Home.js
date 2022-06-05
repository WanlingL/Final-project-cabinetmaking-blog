import styled from "styled-components";
import Header from "./Header";
import Blog from "./Blog";
import SideBar from "./SideBar";



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

`
const MainHome = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;

`