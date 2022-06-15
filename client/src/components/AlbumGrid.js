import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";

const AlbumGrid = () =>{

    const {albums, setAlbums} = useContext(UserContext);
    console.log("albums",albums)

    return(
        <Wrapper>

        { albums.map((album, index)=>{
            return(
                
                <Link to={`/album/${album.id}`}>
                    <AlbumInfo key={index}>
                        <img src= {album.url[0]}
                            style={{ 
                                height: "150px",
                                marginTop:"10px" 
                            }}
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
    width:1200px;
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
    padding-top:5px;
}
`

const AlbumInfo =styled.div` 
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 30px;
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    height: 200px;
    width:300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;


:hover {
    transform: scale(1.03);
  }
  `