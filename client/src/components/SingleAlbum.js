import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Upload from "./Upload";

import { Image } from 'cloudinary-react';



const SingleAlbum = () =>{
  const { albumId } = useParams();
  const [singleAlbum, setSingleAlbum] = useState({});
  const [imageIds, setImageIds]= useState(null); 

//   //calling album 
//   useEffect(() => {
//     fetch(`/api/get-album/${albumId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("setSingleAlbum data",data.data)
//         setSingleAlbum(data.data);
//       })
//       .catch((error) => {
//         console.log("setSingleAlbum", error);
//       });
//   }, []);

  //call images

  //fetch album and map image inside album
  useEffect(() => {
    fetch("/api/images")
    .then((response)=> response.json())
    .then((data)=>{
        setImageIds(data.data)
        console.log("Album: get image data",data.data)
    })
    .catch((error)=>{
        console.log("Album:get image error", error);
    });
}, []);


    return(
        <Wrapper>
            <Upload />
            <p>{singleAlbum.title}</p>

            {imageIds && imageIds.map((imageId, index)=>{ 
                    return(
                        <Image 
                            key={index}
                            cloudName="wanling"
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
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