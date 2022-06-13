import React, { useContext } from "react";
import styled from "styled-components";
import CreateNewAlbum from "./CreateNewAlbum";
import AlbumGrid from "./AlbumGrid";
import { UserContext } from "./Context/UserContext";


const Album =()=>{

    const { userInfo, setUserInfo } = useContext(UserContext);

    return(
        <Wrapper>
            {userInfo &&
                <CreateNewAlbum />
            }
            <AlbumGrid />            
        </Wrapper>
    )
};

export default Album;

const Wrapper=styled.div`
`

