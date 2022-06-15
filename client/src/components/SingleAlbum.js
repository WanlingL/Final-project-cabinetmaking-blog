import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import Upload from "./Upload";
import { Image } from 'cloudinary-react';
import { UserContext } from "./Context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

const SingleAlbum = () =>{
  const { albumId } = useParams();
  const {isAuthenticated, user}=useAuth0()

  const { newUpload, setNewUpload} = useContext(UserContext);

  const [singleAlbumUrl, setSingleAlbumUrl] = useState([]);
  const [singleAlbum, setSingleAlbum] = useState([]);
  const [deleteImage, setDeleteImage] = useState(false);
  

  //calling image(url) belong to album
  useEffect(() => {
    fetch(`/api/get-album/${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("setAlbums(data,data)", data.data)
        setSingleAlbum(data.data)
        setSingleAlbumUrl(data.data.url);
      })
      .catch((error) => {
        console.log("setSingleAlbum", error);
      });
  }, [deleteImage, newUpload]);


  //deleat image handler function
  const handleUpdatedImage = (url)=>{
  
    fetch("/api/updated-image" ,{
      method:"PATCH",
      headers:{
        Accept: "application/json",
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        id: albumId,
        url: url,
      }),
    })
    .then((response)=>response.json())
    .then((data)=>{
        setDeleteImage(!deleteImage);
    });
  };
    
    return(
        <Wrapper>
          {isAuthenticated && user.email === "wanlingliao628@gmail.com" &&
            <Upload />
          }
            <p>{singleAlbum.title}</p>
              {singleAlbumUrl && Array.isArray(singleAlbumUrl) && singleAlbumUrl.map((url, index)=>{ 
                    return(
                      <ImageContainer key={index}>
                        <img src= {url} />
                        
                        {/* //Admin setting */}
                        {isAuthenticated && user.email === "wanlingliao628@gmail.com" &&
                        <DeleteButton>
                          <button type="submit" onClick= {()=>{handleUpdatedImage(url)}}>Delete Image</button>
                        </DeleteButton>}

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
  flex-direction: column;
  margin-top: 20px;
  
  img{
    height: 300px;
  }

  button{
    margin-top: 5px;
    border-radius: 5px;
    border: none;
    padding: 10px;
    width: 100px;
    font-size: 12px;
    background-color: #F7E8D8;
    color: #6F675C;
    cursor: pointer;

};
`;

const DeleteButton = styled.div`
    align-self: flex-end;
`;