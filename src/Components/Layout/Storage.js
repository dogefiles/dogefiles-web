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
import { useSelector, useDispatch } from "react-redux";

export default function Storage() {
  const storageBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("primary.500", "primary.400");

  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { fetchValue } = useSelector(state => state.refetchR);

  const { isLoading, data, refetch } = useQuery("listUploads", () =>
    listUploads(currentUser.uid)
  );

  useEffect(() => {
    if (fetchValue !== "cloud") return;

    refetch();
    dispatch(() => dispatch({ type: "toggle" })); //this toggle will clean the last state it helps in automatic refreshing
  }, [fetchValue, dispatch, refetch]);

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
      {isLoading ? (
        <></>
      ) : (
        <>
          <Heading fontSize="1.6rem" p="2" color={headingColor}>
            Storage
          </Heading>
          <Flex bg={storageBg} borderRadius="6px" p="2" alignItems="center">
            <Box>
              <CircularProgress
                value={totalSize}
                color="primary.400"
                size="100px"
              >
                <CircularProgressLabel>
                  {percentage.toFixed(2)}%
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <VStack>
              <Tag size="md" colorScheme="blue">
                <TagLabel>10 GB Left</TagLabel>
              </Tag>
              <Tag size="md" color="primary.400">
                <TagLabel>{totalSize.toFixed(2)} GB Used</TagLabel>
              </Tag>
            </VStack>
          </Flex>
        </>
      )}
    </>
  );
}
