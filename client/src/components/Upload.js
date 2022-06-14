import { useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { UserContext } from "./Context/UserContext";

const Upload = () => {
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
//   const [uploadImages, setUploadImages] = useState({});
  const [success,setSuccess]=useState(false);
  const { albumId } = useParams();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  //perview selected image
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //convert image to URL
    reader.onloadend = () => {
      //eventlistener
      setPreviewSource(reader.result);
    };
  };

  //submit selected image
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) {
      return;
    }
    uploadImage(previewSource);
  };


  const uploadImage = (base64EncodedImage) => {
    //group of similar binary-to-text encoding

    //upload image 
    fetch("/api/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: base64EncodedImage,
        id: albumId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //upload images to selected album
        if (data.status === 200) {
            setSuccess(true)
          fetch("/api/updated-image-urls", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: albumId,
              url: data.data.url,
              // imageId: data.data.public_id,
            }),
          });
        } else{
            setSuccess(false)
        }
      });
  };

  return (
    <Wrapper>
      <h1>Upload images</h1>
        {success && <SuccessMessage>Post Created</SuccessMessage> }
        <form onSubmit={handleSubmitFile}>
          <input
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInput}
          ></input>
          <button type="submit">Submit</button>
        </form>

        {previewSource && (
          <ImageContainer>
            <img
              src={previewSource}
              alt="selected file"
              style={{ height: "100px" }}
            />
          </ImageContainer>
        )}
        
    </Wrapper>
  );
};

export default Upload;

const Wrapper = styled.div`
  h1{
    color:#464543;
      font-size: 20px;
  }

 input{
    width: 400px;
    padding: 5px;
}

button{
    border-radius: 5px;
    margin-left: 20px;
    border: none;
    padding: 10px;
    width: 100px;
    font-size: 18px;
    color: #6F675C;
    cursor: pointer;

    :hover {
      background-color: #C89B7D;
      color:#f2f2f2;
    }
};
`;

const ImageContainer = styled.div`
  margin-top: 10px;
  margin-bottom:20px;
`;

const SuccessMessage = styled.div`
  margin-top: 10px;
  color:#C89B7D;
`;
