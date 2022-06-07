import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from '@material-ui/core/CircularProgress';

//Links
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Signin from "./Signin";
import Blog from "./Blog";
import Post from "./PostGrid";
import Album from "./Album"
import NavBar from "./NavBar";
import CreateNewPost from "./CreateNewPost";
import SinglePost from "./SinglePost";
import SideBar from "./SideBar";


const App =()=>{
    const { isLoading, user } = useAuth0();

    // if (isLoading) {
    //     return <div><CircularProgress /></div>;
    //   }

    return(
        <Wrapper>
            <Router>
                <GlobalStyles />
                <NavBar />

                <PageLocation>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:postId" elementment={<SinglePost />} />
                            <Route path="/create-new-post" element={<CreateNewPost />} />
                            <Route path="/album" element={<Album />} />
                        </Routes>

                    <SideBarLocation>
                        <SideBar/>
                    </SideBarLocation>
                </PageLocation>
            </Router>
        </Wrapper>
    )
};

export default App;

const Wrapper=styled.div`
`

const PageLocation = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const SideBarLocation=styled.div`
    width:300px;
`