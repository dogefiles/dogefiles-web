import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
  Alert,
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import { FiAlertCircle } from "react-icons/fi";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "Utils/AuthContext";
import { Link as ReactLink } from "react-router-dom";

export default function ForgotPassword({ history }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const { currentUser, resetPassword } = useAuth();
  const [wait, setWait] = useState(false);

  const verificationCheck = useCallback(async () => {
    if (currentUser) {
      if (currentUser?.emailVerified) history.push("/");
    }
  }, [currentUser, history]);

  const handelForgotPasswordSubmit = async e => {
    e.preventDefault();
    if (wait) {
      return toast({
        title: "Please wait 30 seconds before sending resend link",
        status: "warning",
        isClosable: true,
      });
    }

    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
      setWait(true);
      toast({
        title: "Password Reset Link Sent",
        status: "success",
        isClosable: true,
      });
      setTimeout(() => {
        setWait(false);
      }, 30000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 10000);
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
        <title>Forgot Password - Dogefiles</title>
        <meta content="Forgot Password - Dogefiles" property="og:title" />
        <link rel="canonical" href="https://app.dogefiles.io/forgotpassword" />
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
              Forgot Password
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
              <form onSubmit={handelForgotPasswordSubmit}>
                <FormControl id="email">
                  <FormHelperText color="primary.600" my="2">
                    {error && (
                      <Alert status="error">
                        <FiAlertCircle />
                        {error}
                      </Alert>
                    )}
                  </FormHelperText>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>

                <Stack spacing={5}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"blue.400"} onClick={() => history.goBack()}>
                      Back
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
                    Forgot Password
                  </Button>
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
