import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Tooltip,
  IconButton,
  HStack,
  FormHelperText,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { useEffect, useState } from "react";
import { useAuth } from "Utils/AuthContext";
import { Link as ReactLink } from "react-router-dom";

export default function SimpleCard({ history }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, currentUser, googleOAuth } = useAuth();

  const handelSignInSubmit = async e => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signin(email, password);
      history.push("/");
    } catch (err) {
      setError(`${err.message}, Failed to SignIn`);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) history.push("/");
  }, [currentUser, history]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handelSignInSubmit}>
              <FormControl id="email">
                <FormHelperText color="red.500">{error}</FormHelperText>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>

              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  disabled={loading}
                  type="submit"
                >
                  Sign in
                </Button>
                <HStack alignItems="center" justifyContent="center">
                  <Tooltip
                    hasArrow
                    placement="right"
                    label="Google"
                    fontSize="md"
                    bg="blue.600"
                    aria-label="Google"
                  >
                    <IconButton
                      colorScheme="whiteAlpha"
                      size="lg"
                      fontSize="2xl"
                      background="none"
                      aria-label="Signin with Google"
                      icon={<FcGoogle />}
                      onClick={googleOAuth}
                    />
                  </Tooltip>
                </HStack>
                <Link as={ReactLink} to="/signup" color={"blue.400"}>
                  New User? Signup
                </Link>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
