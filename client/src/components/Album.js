import React, { useContext } from "react";
import styled from "styled-components";
import CreateNewAlbum from "./CreateNewAlbum";
import AlbumGrid from "./AlbumGrid";
import { useAuth0 } from "@auth0/auth0-react";


const Album =()=>{

    const {isAuthenticated, user}=useAuth0()

    return(
        <Wrapper>
            {isAuthenticated && user.email === "wanlingliao628@gmail.com" &&
                <CreateNewAlbum />
            }
            <AlbumGrid />            
        </Wrapper>
    )
};

export default Album;

const Wrapper=styled.div`
`

