import styled from "styled-components";
import CreateNewAlbum from "./CreateNewAlbum";
import Upload from "./Upload";

const Album =()=>{

    return(
        <Wrapper>
        Album
        <CreateNewAlbum />
        <Upload />
        </Wrapper>
    )
};

export default Album;

const Wrapper=styled.div`
`
