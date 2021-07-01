import {
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "Utils/AuthContext";
import { Helmet } from "react-helmet";
import uploadAvatar from "./settings.UploadAvatar";
import { S3_AVATAR_UPLOADS_URL, DOGEFILES_AVATAR_BUCKET } from "Constants/S3";

const AvatarBucketURL = S3_AVATAR_UPLOADS_URL;

export default function Settings() {
  console.log(process.env.NODE_ENV, DOGEFILES_AVATAR_BUCKET);
  const toast = useToast();
  const {
    currentUser,
    getUserToken,
    updatePhoto,
    updateName,
    updatePassword,
    logout,
  } = useAuth();
  const userAuthProvider = currentUser.providerData[0].providerId;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [newName, setNewName] = useState(currentUser.displayName);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const changeAvatar = async userToken => {
    let currentAvatarKey = null;
    if (
      currentUser.photoURL !== null &&
      currentUser.photoURL.includes(AvatarBucketURL)
    ) {
      currentAvatarKey = currentUser.photoURL.slice(AvatarBucketURL.length);
    }
    const photoUrl = await uploadAvatar(
      currentAvatarKey,
      file,
      userToken,
      currentUser.uid
    );

    if (photoUrl) {
      await updatePhoto(photoUrl);
    }
  };

  const changeName = async () => {
    await updateName(newName);
  };

  const updateProfile = async e => {
    e.preventDefault();
    const userToken = await getUserToken();

    //Update Image
    if (file) {
      if (file.type.includes("image") && file.size > 1000000) {
        return toast({
          title: `Please upload an image less than 1 MB`,
          status: "error",
          isClosable: true,
        });
      } else if (!file.type.includes("image") || file.type.includes("gif")) {
        return toast({
          title: `Unsupported file type`,
          status: "error",
          isClosable: true,
        });
      }
      setLoading(true);
      await changeAvatar(userToken);
      setLoading(false);
    }

    //Update Name
    if (newName !== currentUser.displayName) {
      setLoading(true);
      await changeName(userToken);
      setLoading(false);
    }

    if (password !== passwordRepeat) {
      return toast({
        title: `Password does not match`,
        status: "error",
        isClosable: true,
      });
    }

    //Update Password
    if (password.length >= 8 && password === passwordRepeat) {
      setLoading(true);
      await updatePassword(password);
      setLoading(false);
      logout();
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
            <Input value={newName} onChange={e => setNewName(e.target.value)} />
            {userAuthProvider !== "google.com" && (
              <>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <FormLabel>Repeat Password</FormLabel>
                <Input
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  value={passwordRepeat}
                  onChange={e => setPasswordRepeat(e.target.value)}
                />
              </>
            )}
            <Button
              type="submit"
              my={2}
              bg="primary.400"
              color="white"
              _hover={{ bg: "primary.500" }}
              isLoading={loading}
            >
              Update
            </Button>
          </FormControl>
        </form>
      </VStack>
    </>
  );
}
