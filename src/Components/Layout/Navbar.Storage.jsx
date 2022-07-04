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
  Icon,
  Tooltip
} from "@chakra-ui/react";
import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";
import { useEffect } from "react";
import {FaDog} from "react-icons/fa";

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

  // let spaceLeft = 20;
  let spaceUsed = 0;
  // let percentage = 0;
  if (data) {
    data.forEach(file => (spaceUsed += file.fileSize));
    spaceUsed = spaceUsed / 1e9; //GB
    // spaceUsed = spaceUsed / 1e6; //MB
    // percentage = (spaceUsed / 20) * 100;
    // spaceLeft = spaceLeft - spaceUsed;
  }

  return (
    <>
      <Heading fontSize="1.6rem" p="2" color={headingColor}>
        Storage
      </Heading>
      <Flex bg={storageBg} borderRadius="6px" p="2" alignItems="center">
        <Box>
          <CircularProgress
            value={spaceUsed ? spaceUsed : 0}
            color="primary.400"
            size="100px"
          >
            <Tooltip label="bow wow">
              <CircularProgressLabel>
                {/* {percentage ? percentage.toFixed(2) : 0}% */}
                <Icon w={8} as={FaDog} />
              </CircularProgressLabel>
            </Tooltip>
          </CircularProgress>
        </Box>
        <VStack mx="5">
          <Tag size="md" colorScheme="blue">
            {/* <TagLabel>{spaceLeft.toFixed(2)} GB Left</TagLabel> */}
            <TagLabel>Unlimited</TagLabel>
          </Tag>
          <Tag size="md" color="primary.400">
            {/* <TagLabel>{spaceUsed ? spaceUsed.toFixed(2) : 0} GB Used</TagLabel> */}
            <TagLabel>Storage</TagLabel>
          </Tag>
        </VStack>
      </Flex>
    </>
  );
}
