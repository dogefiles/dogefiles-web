import {
  Flex,
  Icon,
  Text,
  Divider,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiUploadCloud, FiPlus } from "react-icons/fi";
import CreateUploads from "Components/CreateUploads";

export default function Manager() {
  const [toggle, setToggle] = useState(true);
  return (
    <Flex>
      <Tooltip
        hasArrow
        label="Uploads"
        placement="right"
        color="white"
        bg="primary.500"
      >
        <IconButton
          icon={<FiPlus />}
          color="white"
          bg="primary.400"
          _hover={{ bg: "primary.500" }}
          borderRadius="50%"
          css={{ position: "absolute", bottom: "0", right: "0" }}
          m={2}
          onClick={() => setToggle(!toggle)}
        />
      </Tooltip>
      <Flex
        visibility={toggle ? "hidden" : "display"}
        direction="column"
        width={["60%", "60%", "40%", "30%"]}
        boxShadow="md"
        bg="whiteAlpha.800"
        borderRadius="6px"
        mx={2}
        css={{ position: "absolute", bottom: 60, right: 0 }}
      >
        <Text
          alignSelf="center"
          textAlign="center"
          bg="primary.500"
          color="white"
          py={2}
          fontSize="lg"
          width="100%"
        >
          <Icon as={FiUploadCloud} w={8} />
          Uploads Manager
        </Text>
        <Divider />

        {/* Create Uploads */}
        <CreateUploads />
      </Flex>
    </Flex>
  );
}
