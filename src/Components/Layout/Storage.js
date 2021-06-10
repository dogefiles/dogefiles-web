import {
  Box,
  Heading,
  CircularProgress,
  CircularProgressLabel,
  VStack,
  useColorModeValue,
  Tag,
  TagLabel,
  Flex,
} from "@chakra-ui/react";

export default function Storage() {
  const storageBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("primary.500", "primary.400");
  return (
    <>
      <Heading fontSize="1.6rem" p="2" color={headingColor}>
        Storage
      </Heading>
      <Flex bg={storageBg} borderRadius="6px" p="2" alignItems="center">
        <Box>
          <CircularProgress value={50} color="primary.400" size="100px">
            <CircularProgressLabel>40%</CircularProgressLabel>
          </CircularProgress>
        </Box>
        <VStack>
          <Tag size="md" colorScheme="blue">
            <TagLabel>10 GB Left</TagLabel>
          </Tag>
          <Tag size="md" color="primary.400">
            <TagLabel>5 GB Used</TagLabel>
          </Tag>
        </VStack>
      </Flex>
    </>
  );
}
