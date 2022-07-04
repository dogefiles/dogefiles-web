import Axios from "Utils/Axios";

// Create presignedURL for a file
export const presignedUrl = async (fileInfo, config) =>
  Axios.post("/S3/signedUrl", fileInfo, config);

export const presignedAvatarUrl = async (fileInfo, config) =>
  Axios.post("/S3/presignedAvatarUrl", fileInfo, config);

// Save File to DB after successfull upload to Wasabi S3
export const saveFileToDB = async preSignedFileInfo =>
  Axios.post("/S3/saveFileToDB", preSignedFileInfo);

// Delete File
export const deleteFile = async (bucket, key, firebaseId) =>
  Axios.post(`/S3/deleteFile`, {
    bucket,
    key,
    firebaseId,
  });

// List Uploads for ReactQuery
export const listUploads = async (firebaseId, page) => {
  const { data } = await Axios.post("/S3/listUploads", {
    firebaseId,
    page,
  });
  return data;
};

export const searchUploads = async (firebaseId, searchTerm) => {
  const { data } = await Axios.post("/S3/searchUploads", {
    firebaseId,
    searchTerm,
  });

  return data;
};

export const updatePrivacy = async (firebaseId, key, privacy) => {
  const { data } = await Axios.post("/S3/updatePrivacy", {
    firebaseId,
    key,
    privacy,
  });
  return data;
};
