import { Button } from "@chakra-ui/react";
import { useState } from "react";
import Axios from "Utils/Axios";

const Upload = () => {
  const [files, setFiles] = useState(null);

  const getPreSignedUrl = async () => {
    if (!files) return;

    const file = files[0];
    const fileInfo = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };

    const { data } = await Axios.post("/get-signed-url", fileInfo);
    return data;
  };

  const onSubmit = async e => {
    e.preventDefault();
    const { url, fields } = await getPreSignedUrl();
    const data = {
      bucket: "meow0007",
      ...fields,
      "Content-Type": files[0].type,
      file: files[0],
    };
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    await Axios.post(url, formData);
  };

  const downloadLink = async e => {
    e.preventDefault();
    const response = await Axios.get("http://localhost:5000/download-link");
    const url = await response.json();
    console.log(url);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={e => setFiles(e.target.files)} />
        <br />
        <Button type="submit">Upload</Button>
      </form>
      <form onSubmit={downloadLink}>
        <Button type="submit">Download Link</Button>
      </form>
    </>
  );
};

export default Upload;
