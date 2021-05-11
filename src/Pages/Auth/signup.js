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

function SignUp({ history }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const { signup, currentUser, logout, updateName } = useAuth();

  const verificationCheck = useCallback(async () => {
    if (currentUser) {
      if (currentUser?.emailVerified) history.push("/");
      setError("Please check your email inbox for user verification");
      await updateName(name);
      await currentUser.sendEmailVerification();
      logout();
    }
  }, [currentUser, history, logout, updateName, name]);

  const handelSignUpSubmit = async e => {
    e.preventDefault();

    if (password !== passwordConf) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      await signup(email, password);

      verificationCheck();
    } catch (err) {
      setError(`${err.message}, Failed to SignUp`);
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
            Sign up to Dogefiles
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
            <form onSubmit={handelSignUpSubmit}>
              <FormControl>
                <FormHelperText color="primary.500" my="2">
                  {error}
                </FormHelperText>
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Repeat Password</FormLabel>
                <Input
                  type="password"
                  value={passwordConf}
                  onChange={e => setPasswordConf(e.target.value)}
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
                  Sign up
                </Button>
                <GoogleAuth />
                <Link as={ReactLink} to="/signin" color={"blue.400"}>
                  Already have an account? Signin
                </Link>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp;
