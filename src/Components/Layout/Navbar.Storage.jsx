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
import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";
import { useEffect } from "react";

export default function Storage() {
  const storageBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("primary.500", "primary.400");

  const { currentUser } = useAuth();

  const { data, refetch } = useQuery("listUploads", () =>
    listUploads(currentUser.uid)
  );

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  let totalSize = 0;
  let percentage = 0;
  if (data) {
    data.forEach(file => (totalSize += file.fileSize));
    totalSize = totalSize / 1e9; //GB
    // totalSize = totalSize / 1e6; //MB
    percentage = (totalSize / 20) * 100;
  }

  return (
    <>
      <Heading fontSize="1.6rem" p="2" color={headingColor}>
        Storage
      </Heading>
      <Flex bg={storageBg} borderRadius="6px" p="2" alignItems="center">
        <Box>
          <CircularProgress
            value={totalSize ? totalSize : 0}
            color="primary.400"
            size="100px"
          >
            <CircularProgressLabel>
              {percentage ? percentage.toFixed(2) : 0}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <VStack>
          <Tag size="md" colorScheme="blue">
            <TagLabel>10 GB Left</TagLabel>
          </Tag>
          <Tag size="md" color="primary.400">
            <TagLabel>{totalSize ? totalSize.toFixed(2) : 0} GB Used</TagLabel>
          </Tag>
        </VStack>
      </Flex>
    </>
  );
}
