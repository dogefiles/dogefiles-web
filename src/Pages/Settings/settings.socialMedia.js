import {
  Heading,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaDiscord,
  FaTelegram,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "Utils/AuthContext";
import { userInfo, updateAbout } from "APIs/user";
import { useQuery } from "react-query";

export default function SettingsSocialMedia() {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const { getUserToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [about, setAbout] = useState("");

  //Fetch Query
  const { data, refetch, isError } = useQuery(
    "userInfo",
    async () => {
      const userToken = await getUserToken();
      return userInfo(userToken);
    },
    {
      cacheTime: 0,
    }
  );

  const changeAbout = async (userToken, about) => {
    try {
      const userInfo = await updateAbout(userToken, about);
      console.log(userInfo);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateSocialMedia = async e => {
    e.preventDefault();
    const userToken = await getUserToken();
    if (about !== data.user.about) {
      setLoading(true);
      await updateAbout(userToken, about);
      refetch();
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        border="1px"
        borderColor={borderColor}
        borderRadius="6px"
        p={2}
        width="100%"
      >
        <Flex alignItems="center">
          <Heading as={"h3"} size="md">
            Social Media
          </Heading>
          <Switch mx={1} />
        </Flex>
        <form onSubmit={updateSocialMedia}>
          <FormControl>
            <Flex alignItems="center" my={2}>
              <Icon as={FaUser} boxSize={6} mx={1} />
              <FormLabel m="auto">About</FormLabel>
              <Input
                value={!data ? "" : about ? about : data.user.about}
                onChange={e => setAbout(e.target.value)}
              />
            </Flex>
            <Flex alignItems="center" my={2}>
              <Icon as={FaFacebookSquare} boxSize={6} mx={1} />
              <FormLabel m="auto">https://facebook.com/</FormLabel>
              <Input
                value={facebook}
                onChange={e => setFacebook(e.target.value)}
              />
            </Flex>
            <Flex alignItems="center" my={2}>
              <Icon as={FaTwitterSquare} boxSize={6} mx={1} />
              <FormLabel m="auto">https://twitter.com/</FormLabel>
              <Input
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
              />
            </Flex>
            <Flex alignItems="center" my={2}>
              <Icon as={FaDiscord} boxSize={6} mx={1} />
              <FormLabel m="auto">https://discord.gg/</FormLabel>
              <Input
                value={discord}
                onChange={e => setDiscord(e.target.value)}
              />
            </Flex>
            <Flex alignItems="center" my={2}>
              <Icon as={FaTelegram} boxSize={6} mx={1} />
              <FormLabel m="auto">https://t.me/</FormLabel>
              <Input
                value={telegram}
                onChange={e => setTelegram(e.target.value)}
              />
            </Flex>
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
      </Box>
    </>
  );
}
