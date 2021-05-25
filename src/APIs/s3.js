import Axios from "Utils/Axios";

// Create presignedURL for a file
export const presignedUrl = async (fileInfo, config) =>
  Axios.post("/S3/signedUrl", fileInfo, config);

// Save File to DB after successfull upload to Wasabi S3
export const saveFileToDB = async preSignedFileInfo =>
  Axios.post("/S3/saveFileToDB", preSignedFileInfo);

// Delete File
export const deleteFile = async (key, firebaseId) =>
  Axios.post(`/S3/deleteFile`, {
    key,
    firebaseId,
  });

// List Uploads for ReactQuery
export const listUploads = async firebaseId => {
  const { data } = await Axios.post("/S3/listUploads", {
    firebaseId,
  });
  return data;
};
