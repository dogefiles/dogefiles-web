import {
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "Utils/AuthContext";
import { Helmet } from "react-helmet";
import uploadAvatar from "./settings.UploadAvatar";
import { S3_AVATAR_UPLOADS_URL } from "Constants/S3";

const AvatarBucketURL = S3_AVATAR_UPLOADS_URL;
export default function Settings() {
  const { currentUser, getUserToken, updatePhoto } = useAuth();
  const [file, setFile] = useState(null);

  const updateProfile = async e => {
    e.preventDefault();
    let currentAvatarKey = null;
    if (file) {
      const userToken = await getUserToken();

      if (currentUser.photoURL.includes(AvatarBucketURL)) {
        currentAvatarKey = currentUser.photoURL.slice(AvatarBucketURL.length);
      }
      const photoUrl = await uploadAvatar(
        currentAvatarKey,
        file,
        userToken,
        currentUser.uid
      );

      if (photoUrl) {
        updatePhoto(photoUrl);
      }
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings - Dogefiles</title>
        <meta content="Settings - Dogefiles" property="og:title" />
        <link rel="canonical" href="https://app.dogefiles.io/settings" />
      </Helmet>

      <VStack>
        <form onSubmit={updateProfile}>
          <FormControl>
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src={file ? URL.createObjectURL(file) : currentUser.photoURL}
            />
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" onChange={e => setFile(e.target.files[0])} />
            <FormLabel>Display Name</FormLabel>
            <Input value={currentUser.displayName} />
            <FormLabel>Email</FormLabel>
            <Input type="email" value={currentUser.email} />
            <FormLabel>Password</FormLabel>
            <Input type="password" />
            <FormLabel>Repeat Password</FormLabel>
            <Input type="password" />
            <Button type="submit">Update</Button>
          </FormControl>
        </form>
      </VStack>
    </>
  );
}
