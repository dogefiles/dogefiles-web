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
} from "@chakra-ui/react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaDiscord,
  FaTelegram,
} from "react-icons/fa";
import { useState } from "react";
export default function SettingsSocialMedia() {
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");

  const updateSocialMedia = async e => {
    e.preventDefault();
  };

  return (
    <>
      <Box
        border="1px"
        borderColor="gray.300"
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
              <Icon as={FaFacebookSquare} boxSize={8} mx={1} />
              <FormLabel m="auto">https://facebook.com/</FormLabel>
              <Input
                value={facebook}
                onChange={e => setFacebook(e.target.value)}
              />
            </Flex>
            <Flex alignItems="center" my={2}>
              <Icon as={FaTwitterSquare} boxSize={8} mx={1} />
              <FormLabel m="auto">https://twitter.com/</FormLabel>
              <Input
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
              />
            </Flex>
            <Flex alignItems="center" my={2}>
              <Icon as={FaDiscord} boxSize={8} mx={1} />
              <FormLabel m="auto">https://discord.gg/</FormLabel>
              <Input
                value={discord}
                onChange={e => setDiscord(e.target.value)}
              />
            </Flex>
            <Flex alignItems="center" my={2}>
              <Icon as={FaTelegram} boxSize={8} mx={1} />
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
            >
              Update
            </Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
}
