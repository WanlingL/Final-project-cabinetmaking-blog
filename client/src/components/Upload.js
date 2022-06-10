import { useState } from "react";
import styled from "styled-components";

const Upload =()=>{
    const [fileInput, setFileInput] = useState("");
    const [selectFile, setSelectFile] = useState("");
    const [previewSource, setPreviewSource] = useState("");

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
                data:base64EncodedImage
            }),
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log("data", data)
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
