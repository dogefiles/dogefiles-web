import { Text, VStack } from "@chakra-ui/layout";
import { Skeleton, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads, deleteFile } from "APIs/s3";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const FilesTable = ({ files }) => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const deleteFileS3 = async key => {
    await deleteFile(key, currentUser.uid);
    dispatch(() => dispatch({ type: "cloud" }));
  };

  return (
    <>
      {files && (
        <Table
          variant="simple"
          boxShadow="md"
          onContextMenu={() => alert("hello")}
        >
          <Thead boxShadow="md">
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th isNumeric>Last Modified</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files &&
              files.map(file => {
                return (
                  <Tr key={file.key} onClick={() => deleteFileS3(file.key)}>
                    <Td>{file.fileName}</Td>
                    <Td>{file.fileType}</Td>
                    <Td isNumeric>{file.createdAt}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default function Cloud() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { fetchValue } = useSelector(state => state.refetchR);

  const { isLoading, data, refetch } = useQuery(
    "listUploads",
    () => listUploads(currentUser.uid),
    {
      cacheTime: 1,
    }
  );

  useEffect(() => {
    if (fetchValue !== "cloud") return;

    refetch();
    dispatch(() => dispatch({ type: "toggle" }));
  }, [fetchValue, dispatch, refetch]);

  return (
    <>
      <Skeleton
        // isLoaded={files.length !== 0}
        isLoaded={!isLoading}
        startColor="gray"
        endColor="gray.200"
      >
        <VStack align="left">
          <Text color="gray.400">Recents</Text>
          {!isLoading && <FilesTable files={data} />}
        </VStack>
      </Skeleton>
    </>
  );
}
