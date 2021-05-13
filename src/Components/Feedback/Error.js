import { Alert, Text } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";

export default function Error({ error }) {
  return (
    <Alert status="error">
      <FiAlertCircle color="red" />
      <Text ml="1">{error}</Text>
    </Alert>
  );
}
