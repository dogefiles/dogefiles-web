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
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "Utils/AuthContext";
import { Link as ReactLink } from "react-router-dom";
import { GoogleAuth } from "Components/Auth";
import { Error } from "Components/Feedback";
import { userCheck } from "APIs/auth";

export default function SimpleCard({ history, location }) {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, currentUser, getUserToken, logout } = useAuth();

  const verificationCheck = useCallback(async () => {
    if (currentUser) {
      if (!currentUser.emailVerified)
        return setError("Please check your email inbox for user verification");

      const userToken = await getUserToken();
      await userCheck(userToken)
        .then(res => {
          toast({
            title: `Welcome Back, ${currentUser.displayName}`,
            status: "success",
            isClosable: true,
          });
          //check if the user came wit hsome query strings
          if (location.search.includes("settings")) {
            return history.push("/settings");
          }
          return history.push("/");
        })
        .catch(err => {
          toast({
            title: "There was an error signing up",
            status: "error",
            isClosable: true,
          });
          return logout();
        });
    }
  }, [currentUser, history, getUserToken, toast, logout, location]);

  const handelSignInSubmit = async e => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signin(email, password);
      verificationCheck();
    } catch (err) {
      setError(`${err.message}, Failed to SignIn`);
      setTimeout(() => setError(""), 10000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) return verificationCheck();
  }, [currentUser, history, verificationCheck]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signin - Dogefiles</title>
        <meta content="Signin - Dogefiles" property="og:title" />
        <link rel="canonical" href="https://app.dogefiles.io/signin" />
      </Helmet>
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
              to enjoy all of our cool{" "}
              <Link color={"primary.300"}>features</Link> ✌️
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
                    {error && <Error error={error} />}
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
                    <Link
                      as={ReactLink}
                      color={"blue.400"}
                      to="/forgotpassword"
                    >
                      Forgot password?
                    </Link>
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
    </>
  );
}
