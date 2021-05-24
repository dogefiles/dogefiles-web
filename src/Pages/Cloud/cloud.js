import { Text, VStack } from "@chakra-ui/layout";
import { Skeleton, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import Axios from "Utils/Axios";
import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";

const FilesTable = ({ files }) => {
  const { currentUser } = useAuth();

  const deleteFile = async key => {
    await Axios.post(`/S3/deleteFile`, {
      key: key,
      firebaseId: currentUser.uid,
    });
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
                  <Tr key={file.key} onClick={() => deleteFile(file.key)}>
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

  const listUploads = async () => {
    const { data } = await Axios.post("/S3/listUploads", {
      firebaseId: currentUser.uid,
    });
    return data;
  };

  const { isLoading, data } = useQuery("listUploads", listUploads, {
    cacheTime: 1,
    refetchInterval: 1000,
  });

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
