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

export default function Settings() {
  const { currentUser, updateName } = useAuth();
  const user = currentUser.providerData[0];
  console.log(currentUser);
  const [name, setName] = useState(currentUser.displayName);

  const onSubmit = e => {
    e.preventDefault();
    if (name !== null) {
      updateName(name);
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
        <form onSubmit={onSubmit}>
          <FormControl>
            <Avatar size="2xl" name="Segun Adebayo" src={user.photoURL} />
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" />
            <FormLabel>Display Name</FormLabel>
            <Input value={name} onChange={e => setName(e.value)} />
            <FormLabel>Email</FormLabel>
            <Input type="email" value={user.email} />
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
