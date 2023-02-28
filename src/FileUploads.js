import React, { useState } from "react";
import axios from "axios";

const FileUploads = () => {
  const [file, setFile] = useState(null);
  const [title, settitle] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = event => {
    settitle(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(file);

    try {
      const data = {
        title: title
      };
      const resData = await axios({
        method: "POST",
        url: "http://localhost:1337/posts",
        data: data
      });
      const formData = new FormData();
      formData.append("files", file);
      const id = resData.data.id;
      formData.append("ref", "post"); //name of content type
      formData.append("refId", id); //id of content type
      formData.append("field", "image"); //name of key for the content type
      fetch("http://localhost:1337/upload", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(result => {
          console.log("Success:", result);
        })
        .catch(error => {
          console.error("Error:", error);
        });
      console.log(resData.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FileUpload">
      <form onSubmit={handleSubmit}>
        <input onChange={handleFileChange} type="file" />

        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleTitleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FileUploads;
