import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,
  Button,
  Text,
} from "@chakra-ui/react";
import { deleteFile, updatePrivacy } from "APIs/s3";
import { useAuth } from "Utils/AuthContext";
import { useDispatch } from "react-redux";
import { FiDelete, FiEye, FiEyeOff, FiShare2 } from "react-icons/fi";
import TypeIdentifider from "Components/TypeIdentifier";
import { useState } from "react";

const copyDownloadLink = key => {
  let tempInput = document.createElement("input");
  tempInput.value = `https://dogefiles-next.vercel.app/download/${key}`;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  document.execCommand("copy");
};

export default function FilesTable({ files }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const toast = useToast();
  const [privacyBtnLoading, setPrivacyBtnLoading] = useState(false);

  const deleteFileS3 = async key => {
    await deleteFile(key, currentUser.uid);
    dispatch(() => dispatch({ type: "cloud" }));
  };

  console.log(files);

  const updatePrivacyS3 = async (firebaseId, key, privacy) => {
    await updatePrivacy(firebaseId, key, privacy);
    setPrivacyBtnLoading(false);
    dispatch(() => dispatch({ type: "cloud" }));
  };

  return (
    <>
      {files && (
        <Table variant="simple" boxShadow="md">
          <Thead boxShadow="md">
            <Tr>
              <Th>Name</Th>
              {/* <Th>Type</Th> */}
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
                  <Tr key={file.key} onContextMenu={() => alert("Right Click")}>
                    <Td>
                      <Flex alignItems="center">
                        <TypeIdentifider fileType={file.fileType} />
                        <Text mx={1}>{file.fileName}</Text>
                      </Flex>
                    </Td>
                    <Td>{file.fileSize / 1000}Kb</Td>
                    <Td>
                      <Button
                        variant="outline"
                        border="none"
                        isLoading={privacyBtnLoading}
                        onClick={() => {
                          setPrivacyBtnLoading(true);
                          updatePrivacyS3(
                            currentUser.uid,
                            file.key,
                            file.privacy === "private" ? "public" : "private"
                          );
                        }}
                      >
                        {file.privacy === "private" ? <FiEyeOff /> : <FiEye />}
                      </Button>
                    </Td>
                    <Td>{new Date(file.createdAt).toLocaleString()}</Td>
                    <Td isNumeric>{file.downloads}</Td>
                    <Td>
                      <Flex justifyContent="space-between" alignItems="center">
                        {/* Copy download link */}
                        <Button
                          variant="outline"
                          border="none"
                          onClick={() => {
                            toast({
                              title: "Copied",
                              description: "Download link copied to clipboard",
                              position: "top-right",
                              status: "success",
                              duration: 2000,
                              isClosable: true,
                            });
                            copyDownloadLink(file.key);
                          }}
                        >
                          <FiShare2 />
                        </Button>

                        {/* Delete File */}
                        <Button
                          variant="outline"
                          border="none"
                          onClick={() => {
                            const request = window.confirm(
                              "Are you sure you want to delete the file ?"
                            );
                            if (!request) return;
                            deleteFileS3(file.key);
                          }}
                        >
                          <FiDelete />
                        </Button>
                      </Flex>
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
