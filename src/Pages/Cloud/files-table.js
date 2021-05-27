import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  // Flex,
  useToast,
} from "@chakra-ui/react";
// import { deleteFile } from "APIs/s3";
// import { useAuth } from "Utils/AuthContext";
// import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff, FiShare2 } from "react-icons/fi";
import { useState } from "react";
import TypeIdentifider from "Components/TypeIdentifier";

export default function FilesTable({ files }) {
  // const { currentUser } = useAuth();
  // const dispatch = useDispatch();
  const [privacy, setPrivacy] = useState(true);
  const toast = useToast();

  // const deleteFileS3 = async key => {
  //   await deleteFile(key, currentUser.uid);
  //   dispatch(() => dispatch({ type: "cloud" }));
  // };

  console.log(files);
  return (
    <>
      {files && (
        <Table variant="simple" boxShadow="md">
          <Thead boxShadow="md">
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Size</Th>
              <Th>Privacy</Th>
              <Th>Last Modified</Th>
              <Th isNumeric>Downloads</Th>
            </Tr>
          </Thead>
          <Tbody color="gray.600">
            {files &&
              files.map(file => {
                return (
                  // <Tr key={file.key} onClick={() => deleteFileS3(file.key)}>
                  <Tr key={file.key} onContextMenu={() => alert("Right Click")}>
                    <Td>
                      {/* <Flex alignItems="center" justifyContent="space-between">
                        <TypeIdentifider fileType={file.fileType} />
                      </Flex> */}
                      {file.fileName}
                    </Td>
                    <Td>
                      <TypeIdentifider fileType={file.fileType} />
                    </Td>
                    <Td>{file.fileSize / 1000}Kb</Td>
                    <Td>
                      {privacy ? (
                        <FiEyeOff onClick={() => setPrivacy(false)} />
                      ) : (
                        <FiEye onClick={() => setPrivacy(true)} />
                      )}
                    </Td>
                    <Td>{new Date(file.createdAt).toLocaleString()}</Td>
                    <Td isNumeric>{file.downloads}</Td>
                    <Td
                      onClick={() =>
                        toast({
                          title: "Copied",
                          description: "Download link copied to clipboard",
                          position: "top-right",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        })
                      }
                    >
                      <FiShare2 />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      )}
    </>
  );
}
