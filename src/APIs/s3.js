import Axios from "Utils/Axios";

// Create presignedURL for a file
export const presignedUrl = async (fileInfo, config) =>
  Axios.post("/S3/signedUrl", fileInfo, config);

// sameNameFileCheck Check before uploading
// export const sameNameFileCheck = async (fileName, firebaseId) => {
//   const { data } = await Axios.post("/S3/listUploads", {
//     firebaseId: firebaseId,
//   });
//   if (!data) return false;

//   return Boolean(data.find(data => data.fileName === fileName));
// };
