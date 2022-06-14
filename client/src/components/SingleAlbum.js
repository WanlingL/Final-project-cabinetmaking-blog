import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import Upload from "./Upload";
import { Image } from 'cloudinary-react';
import { UserContext } from "./Context/UserContext";

const SingleAlbum = () =>{
  const { albumId } = useParams();
  const {userInfo, setUserInfo} = useContext(UserContext);
  const {albums, setAlbums} = useContext(UserContext);

  const [singleAlbumUrl, setSingleAlbumUrl] = useState([]);
  const [deleteImage, setDeleteImage] = useState([])

  //calling image(url) belong to album
  useEffect(() => {
    fetch(`/api/get-album/${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("setAlbums(data,data)", data.data)
        setAlbums(data.data)
        setSingleAlbumUrl(data.data.url);
      })
      .catch((error) => {
        console.log("setSingleAlbum", error);
      });
  }, []);


  // //updated image
  // //handler function
  //   fetch("" ,{
  //     method:"DELETE",
  //     headers:{
  //       Accept: "application/json",
  //       "Content-Type":"application/json"
  //     },
  //     body: JSON.stringify({
  //       id: albumId,
  //       url: singleAlbumUrl,
  //     }),
  //   })
  //   .then((response)=>response.json())
  //   .then((data)=>{
  //       console.log("delete image data", data)
  //   })


    return(
        <Wrapper>
          {userInfo &&
            <Upload />
          }
            <p>{albums.title}</p>

              {singleAlbumUrl && Array.isArray(singleAlbumUrl) && singleAlbumUrl.map((url, index)=>{ 
                    return(
                      <ImageContainer key={index}>
                       
                        <img src= {url} />
                      </ImageContainer>
                        // <Image 
                        //     key={index}
                        //     cloudName="wanling"
                        //     publicId={imageId}
                        //     width="300"
                        //     crop="scale"
                        // />
                    ) 
                })}
        </Wrapper>
    )
};

export default SingleAlbum;

const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  align-content: center;
  align-items: center;
  margin-top: 50px;
  margin-left: 50px;
`

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  
  img{
    height: 300px;
  }
`;