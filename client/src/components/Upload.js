import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Upload =()=>{
    const [fileInput, setFileInput] = useState("");
    const [selectFile, setSelectFile] = useState("");
    const [previewSource, setPreviewSource] = useState("");
    const [uploadImages, setUploadImages] = useState({});
    const {albumId} = useParams();

    const handleFileInputChange = (e) =>{
        const file = e.target.files[0]
            previewFile(file);
    };

    //perview for image
    const previewFile =(file)=>{
        const reader = new FileReader();
            console.log("reader", reader)
        reader.readAsDataURL(file);//convert image to URL
        reader.onloadend = () =>{//eventlistener
            setPreviewSource(reader.result);
            // console.log("reader.result",reader.result)
        }
    };

    const handleSubmitFile =(e) =>{
        e.preventDefault();
        if(!previewSource){
            return
        };
        uploadImage(previewSource);
    };

    const uploadImage = (base64EncodedImage)=>{//group of similar binary-to-text encoding
        // console.log("base64EncodedImage", base64EncodedImage);

        fetch("/api/upload",{
            method: "POST",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                data:base64EncodedImage,
                id: albumId
            }),
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.status === 200){
                fetch("/api/updated-image-urls", {
                    method: "POST",
                    headers:{
                        Accept: "application/json",
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        id:albumId,
                        url:data.data.url
                    })
                })
            }      
        })
    };

    return(
        <Wrapper>
            <h1>Upload</h1>
            <form onSubmit={handleSubmitFile}>
                <input 
                    type ="file" 
                    name = "image" 
                    onChange={handleFileInputChange} 
                    value={fileInput}>
                </input>
                <button type="submit">Submit</button>
            </form>
            {previewSource && (
                <img src= {previewSource} 
                    alt="selected file" 
                    style={{height:"100px"}}/>
            )}
        </Wrapper>
    )
};

export default Upload;

const Wrapper =styled.div`

`
