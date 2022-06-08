import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "./Context/UserContext";

//Links
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Blog from "./Blog";
import Album from "./Album";
import NavBar from "./NavBar";
import CreateNewPost from "./CreateNewPost";
import SinglePost from "./SinglePost";
import SideBar from "./SideBar";

const App = () => {
  const { isLoading, user } = useAuth0();
  const { posts, setPosts } = useContext(UserContext);
  const { isLoaded, setIsLoaded } = useContext(UserContext);

  // Get all post-----------------------------------------
  useEffect(() => {
    fetch("/api/get-blog-posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data);
        setIsLoaded(true);
        // console.log("/api/get-blog-posts data data",data.data)
      })
      .catch((error) => {
        console.log("/api/get-blog-posts error", error);
      });
  }, []);

  // if (isLoading) {
  //     return <div><CircularProgress /></div>;
  //   }

  return (
    <Wrapper>
      <Router>
        <GlobalStyles />
        <NavBar />

        <PageLocation>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<SinglePost />} />
            <Route path="/create-new-post" element={<CreateNewPost />} />
            <Route path="/album" element={<Album />} />
          </Routes>

          <SideBarLocation>
            <SideBar />
          </SideBarLocation>
        </PageLocation>
      </Router>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div``;

const PageLocation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SideBarLocation = styled.div`
  width: 300px;
`;
