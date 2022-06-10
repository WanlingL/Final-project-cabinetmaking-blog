import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect,useContext } from "react";
import Upload from "./Upload";
import { UserContext } from "./Context/UserContext";
import { Image } from 'cloudinary-react';



const SingleAlbum = () =>{
  const { albumId } = useParams();
  const [singleAlbum, setSingleAlbum] = useState([]);
  const [imageIds, setImageIds]= useState(null); 
  const {albums, setAlbums} = useContext(UserContext);

  //calling album 
  useEffect(() => {
    fetch(`/api/get-album/${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("setSingleAlbum data",data.data.url)
        setSingleAlbum(data.data.url);
      })
      .catch((error) => {
        console.log("setSingleAlbum", error);
      });
  }, []);



    return(
        <Wrapper>
            <Upload />
            <p>{singleAlbum.title}</p>

            {singleAlbum && Array.isArray(singleAlbum) && singleAlbum.map((url, index)=>{ 
                    return(
                        <img src= {url} />

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