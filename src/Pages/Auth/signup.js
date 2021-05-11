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

function SignUp({ history }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const { signup, currentUser, googleOAuth } = useAuth();

  const handelSignUpSubmit = async e => {
    e.preventDefault();

    if (password !== passwordConf) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      await signup(email, password);
      history.push("/");
    } catch (err) {
      setError(`${err.message}, Failed to SignUp`);
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
            <form onSubmit={handelSignUpSubmit}>
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

              <FormControl id="password">
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
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  disabled={loading}
                  type="submit"
                >
                  Sign up
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
