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
  FormHelperText,
} from "@chakra-ui/react";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "Utils/AuthContext";
import { Link as ReactLink } from "react-router-dom";
import GoogleAuth from "Components/GoogleAuth";
import Axios from "Utils/Axios";

export default function SimpleCard({ history }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, currentUser, getUserToken } = useAuth();

  const verificationCheck = useCallback(async () => {
    if (currentUser) {
      if (currentUser?.emailVerified) {
        console.log(await getUserToken());
        const config = {
          headers: {
            Authorization: `Bearer ${await getUserToken()}`,
          },
        };

        const { data } = await Axios.get("/auth", config);
        console.log(data);
        history.push("/");
      }

      setError("Please check your email inbox for user verification");
    }
  }, [currentUser, history, getUserToken]);

  const handelSignInSubmit = async e => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signin(email, password);
      verificationCheck();
    } catch (err) {
      setError(`${err.message}, Failed to SignIn`);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) verificationCheck();
  }, [currentUser, history, verificationCheck]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color="primary.500">
            Sign in to Dogefiles
          </Heading>
          <Text fontSize={"lg"} color={"primary.500"}>
            to enjoy all of our cool <Link color={"primary.300"}>features</Link>{" "}
            ✌️
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
                <FormHelperText color="primary.500" my="2">
                  {error}
                </FormHelperText>
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
                  bg={"primary.400"}
                  color={"white"}
                  _hover={{
                    bg: "primary.500",
                  }}
                  disabled={loading}
                  type="submit"
                >
                  Sign in
                </Button>
                {/* <HStack alignItems="center" justifyContent="center">
                  <Tooltip
                    hasArrow
                    placement="right"
                    label="Google"
                    fontSize="md"
                    bg="primary.500"
                    aria-label="Google"
                  >
                    <IconButton
                      colorScheme="whiteAlpha"
                      size="lg"
                      fontSize="5xl"
                      background="none"
                      aria-label="Signin with Google"
                      icon={<FcGoogle />}
                      onClick={googleOAuth}
                    />
                  </Tooltip>
                </HStack> */}
                <GoogleAuth />
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
