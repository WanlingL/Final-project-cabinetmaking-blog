import { useEffect, useState } from "react";
import styled from "styled-components";
import CreateNewAlbum from "./CreateNewAlbum";
import Upload from "./Upload";
import { Image } from 'cloudinary-react';

const Album =()=>{
    const [imageIds, setImageIds]= useState([]); 
    

    //call images
    useEffect(() => {
        fetch("/api/images")
        .then((response)=> response.json())
        .then((data)=>{
            setImageIds(data.data)
            console.log("Album: get image data.data",data.data)
        })
        .catch((error)=>{
            console.log("Album:get image error", error);
        });
    }, []);


    return(
        <Wrapper>
            Album
            <CreateNewAlbum />
            <Upload />
                {imageIds && imageIds.map((imageId, index)=>{
                    <Image
                        key={index}
                        cloudName="wanling"
                        publicId={imageId}
                        width="300"
                        crop="scale"
                    />
            })}
        </Wrapper>
    )
};

export default Album;

const Wrapper=styled.div`
`

