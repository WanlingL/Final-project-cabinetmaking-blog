import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import React from "react";
import styled from "styled-components";

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


const App =()=>{

    return(
        <Wrapper>
            <Router>
                <GlobalStyles />
                <NavBar />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:postId" elementment={<SinglePost />} />
                        <Route path="/create-new-post" element={<CreateNewPost />} />
                        <Route path="/album" element={<Album />} />
                    </Routes>

            </Router>
        </Wrapper>
    )
};

export default App;

const Wrapper=styled.div`

`