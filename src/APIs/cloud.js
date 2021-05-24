import Axios from "Utils/Axios";

export const presignedUrl = async (fileInfo, config) =>
  await Axios.post("/S3/signedUrl", fileInfo, config);
