import { presignedAvatarUrl, deleteFile } from "APIs/s3";
import Axios from "Utils/Axios";

const getPresignedUrl = async (fileInfo, config) => {
  const { data } = await presignedAvatarUrl(fileInfo, config);
  return data;
};

export default async function uploadAvatar(
  avatarKey = null,
  file,
  userToken,
  firebaseId
) {
  const fileInfo = {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const { url, fields } = await getPresignedUrl(fileInfo, config);

  const data = {
    bucket: "dogefiles-avatar",
    ...fields,
    "Content-Type": file.type,
    file: file,
  };

  const formData = new FormData();
  for (const name in data) {
    formData.append(name, data[name]);
  }

  return await Axios.post(url, formData).then(async () => {
    if (avatarKey) {
      await deleteFile("dogefiles-avatar", avatarKey, firebaseId);
    }
    const photoURL = `${url}/${fields.key}`;
    return photoURL;
  });
}
