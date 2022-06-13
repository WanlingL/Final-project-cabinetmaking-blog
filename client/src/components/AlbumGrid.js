import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";

const AlbumGrid = () =>{

    const {albums, setAlbums} = useContext(UserContext);
    console.log("albums",albums)

    return(
        <Wrapper>

        {albums.map((album, index)=>{
            return(
                
                <Link to={`/album/${album.id}`}>
                    <AlbumInfo>
                        <img src= {album.url[0]}
                            style={{ height: "100px" }}
                         />
                        <h2>{album.title}</h2>
                    </AlbumInfo>
                </Link>
            )
        })}
        </Wrapper>
    )
};

export default AlbumGrid;

const Wrapper=styled.div`
    width:1000px;
    flex-wrap: wrap;
    display: flex;
    margin: 20px;
    align-items: space-between;
    justify-content: center;
    text-align: center;

a {
    text-decoration: none;
    color: #6F675C;
}
h2{
    margin-top: 10px;
    font-size: 20px;
}
`

const AlbumInfo =styled.div` 
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 30px;
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    height: 150px;
    width:200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;


:hover {
    transform: scale(1.03);
  }
  `