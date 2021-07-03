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
  Spinner,
} from "@chakra-ui/react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaDiscord,
  FaTelegram,
  FaUser,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth } from "Utils/AuthContext";
import { userInfo, updateContact, updateContactVisibility } from "APIs/user";
import { useQuery } from "react-query";

export default function SettingsUserContact() {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const { getUserToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [contactVisibility, setContactVisibility] = useState();

  //Fetch Query
  const { data, refetch } = useQuery(
    "userInfo",
    async () => {
      const userToken = await getUserToken();
      return userInfo(userToken);
    },
    {
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (!data) return;
    console.log(data);
    setContactVisibility(data.user.contactVisibility);
    setAbout(data.user.contact.about);
    setFacebook(data.user.contact.facebook);
    setTwitter(data.user.contact.twitter);
    setDiscord(data.user.contact.discord);
    setTelegram(data.user.contact.telegram);
  }, [data]);

  const updateContactInfo = async e => {
    e.preventDefault();
    const userToken = await getUserToken();
    setLoading(true);
    await updateContact(userToken, {
      about,
      facebook,
      twitter,
      discord,
      telegram,
    });
    refetch();
    setLoading(false);
  };

  const onChangeContactVisibility = async () => {
    setLoading(true);
    const userToken = await getUserToken();
    await updateContactVisibility(userToken, !contactVisibility);
    setContactVisibility(!contactVisibility);
    setLoading(false);
  };

  return !data ? (
    <Spinner />
  ) : (
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
        <Switch
          mx={1}
          isChecked={contactVisibility}
          onChange={onChangeContactVisibility}
          isDisabled={loading}
        />
      </Flex>
      <form onSubmit={updateContactInfo}>
        <FormControl>
          <Flex alignItems="center" my={2}>
            <Icon as={FaUser} boxSize={6} mx={1} />
            <FormLabel m="auto">About</FormLabel>
            <Input value={about} onChange={e => setAbout(e.target.value)} />
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
            <Input value={twitter} onChange={e => setTwitter(e.target.value)} />
          </Flex>
          <Flex alignItems="center" my={2}>
            <Icon as={FaDiscord} boxSize={6} mx={1} />
            <FormLabel m="auto">https://discord.gg/</FormLabel>
            <Input value={discord} onChange={e => setDiscord(e.target.value)} />
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
  );
}
