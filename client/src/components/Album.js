import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateNewAlbum from "./CreateNewAlbum";

import { Image } from 'cloudinary-react';
import AlbumGrid from "./AlbumGrid";


const Album =()=>{
    // const [imageIds, setImageIds]= useState(null); 

    // //call images
    // useEffect(() => {
    //     fetch("/api/images")
    //     .then((response)=> response.json())
    //     .then((data)=>{
    //         setImageIds(data.data)
    //         console.log("Album: get image data",data.data)
    //     })
    //     .catch((error)=>{
    //         console.log("Album:get image error", error);
    //     });
    // }, []);

    return(
        <Wrapper>
            <CreateNewAlbum />
            <AlbumGrid />            
                {/* {imageIds && imageIds.map((imageId, index)=>{ 
                    return(
                        <Image 
                            key={index}
                            cloudName="wanling"
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ) 
                })} */}
        </Wrapper>
    )
};

export default Album;

const Wrapper=styled.div`
`

