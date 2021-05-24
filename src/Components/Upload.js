import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "Utils/AuthContext";
import Axios from "Utils/Axios";

const Upload = () => {
  const [files, setFiles] = useState(null);
  const { getUserToken } = useAuth();

  const getPreSignedUrl = async () => {
    if (!files) return;

    const userToken = await getUserToken();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const file = files[0];
    console.log(file);
    const fileInfo = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };

    // const r = await Axios.post("/S3/signedUrl", fileInfo, config)
    //   .then(res => {
    //     if (res.status !== 200) throw Error("not supported");
    //   })
    //   .catch(err => console.log(err.message));

    // console.log(r);
    // return r.data;
    const { data } = await Axios.post("/S3/signedUrl", fileInfo, config);
    return data;
  };

  const onSubmit = async e => {
    e.preventDefault();

    const userToken = await getUserToken();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { url, fields } = await getPreSignedUrl();
    const file = files[0];

    const fileInfo = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      key: fields.key,
    };

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

    await Axios.post(url, formData)
      .then(async res => {
        console.log(res);
        if (res.status !== 204) {
          throw Error("Error while uploading");
        }
        //save file to DB
        await Axios.post("/S3/saveFileToDB", fileInfo, config);
      })
      .catch(err => console.log(err.message));
  };

  const downloadLink = async e => {
    e.preventDefault();
    // const response = await Axios.get("http://localhost:5000/download-link");
    // const url = await response.json();
    // console.log(url);

    const userToken = await getUserToken();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const res = await Axios.get("/S3/listObjects", config);
    console.log(res.data);
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
