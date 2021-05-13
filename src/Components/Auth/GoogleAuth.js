import { HStack, Tooltip, IconButton } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "Utils/AuthContext";

export default function GoogleAuth() {
  const { googleOAuth } = useAuth();
  return (
    <HStack alignItems="center" justifyContent="center">
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
    </HStack>
  );
}
