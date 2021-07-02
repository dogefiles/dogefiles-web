import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,
  Tooltip,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { deleteFile, updatePrivacy } from "APIs/s3";
import { useAuth } from "Utils/AuthContext";
import { useDispatch } from "react-redux";
import {
  FiDelete,
  FiShare2,
  FiDownload,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { TypeIdentifier } from "Components/Others";
import { useState } from "react";
import nameFormatter from "Utils/nameFormatter";
import fileSizeFormatter from "Utils/fileSizeFormatter";
import {DOGEFILES_MAIN_BUCKET} from "Constants/S3";

const copyDownloadLink = id => {
  let tempInput = document.createElement("input");
  tempInput.value = `https://dogefiles.io/download/${id}`;
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
  const tableBodyColor = useColorModeValue("gray.700", "gray.400");
  const tableBtnColor = useColorModeValue("gray.600", "gray.300");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");

  const deleteFileS3 = async key => {
    await deleteFile(DOGEFILES_MAIN_BUCKET, key, currentUser.uid);
    dispatch(() => dispatch({ type: "cloud" }));
  };

  //console.log(files, "from files table file");

  const updatePrivacyS3 = async (firebaseId, key, privacy) => {
    await updatePrivacy(firebaseId, key, privacy);
    setPrivacyBtnLoading(false);
    dispatch(() => dispatch({ type: "cloud" }));
  };

  // files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {files && (
        <Table
          variant="simple"
          boxShadow="md"
          // width={["50%", "50%", "90%", "99%"]}
        >
          <Thead boxShadow="md">
            <Tr>
              <Th>Name</Th>
              {/* <Th>Type</Th> */}
              <Th>Size</Th>
              <Th>Privacy</Th>
              <Th isTruncated>Last Modified</Th>
              <Th isNumeric>Downloads</Th>
            </Tr>
          </Thead>
          <Tbody
            color={tableBodyColor}
            borderLeft="1px"
            borderRight="1px"
            borderBottom="1px"
            borderColor={tableBorderColor}
          >
            {files &&
              files.map(file => {
                return (
                  <Tr key={file.key} onContextMenu={() => alert("Right Click")}>
                    <Td>
                      <Flex alignItems="center">
                        <TypeIdentifier fileType={file.fileType} />
                        <Text mx={1}>{nameFormatter(file.fileName)}</Text>
                      </Flex>
                    </Td>
                    <Td>{fileSizeFormatter(file.fileSize)}</Td>
                    <Td>
                      <Tooltip
                        hasArrow
                        arrowSize={6}
                        bg="primary.400"
                        label={`${file.privacy}`}
                      >
                        <Button
                          variant="outline"
                          border="none"
                          color={tableBtnColor}
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
                          {file.privacy === "private" ? (
                            <FiLock />
                          ) : (
                            <FiUnlock />
                          )}
                        </Button>
                      </Tooltip>
                    </Td>
                    <Td isTruncated>
                      {new Date(file.createdAt).toLocaleString()}
                    </Td>
                    <Td isNumeric>
                      {file.downloads && file.downloads.length > 0
                        ? file.downloads.length
                        : 0}
                    </Td>
                    <Td>
                      <Flex justifyContent="space-between" alignItems="center">
                        <Tooltip
                          hasArrow
                          arrowSize={6}
                          bg="primary.400"
                          label={"Download"}
                        >
                          <Button
                            variant="outline"
                            border="none"
                            color={tableBtnColor}
                            onClick={() =>
                              window.open(
                                `https://dogefiles.io/download/${file._id}`,
                                "_blank"
                              )
                            }
                          >
                            <FiDownload />
                          </Button>
                        </Tooltip>
                        {/* Copy download link or share */}
                        <Tooltip
                          hasArrow
                          arrowSize={6}
                          bg="primary.400"
                          label={"Share"}
                        >
                          <Button
                            variant="outline"
                            border="none"
                            color={tableBtnColor}
                            onClick={() => {
                              toast({
                                title: "Copied",
                                description:
                                  "Download link copied to clipboard",
                                position: "top-right",
                                status: "success",
                                duration: 2000,
                                isClosable: true,
                              });
                              copyDownloadLink(file._id);
                            }}
                          >
                            <FiShare2 />
                          </Button>
                        </Tooltip>

                        {/* Delete File */}
                        <Tooltip
                          hasArrow
                          arrowSize={6}
                          bg="primary.400"
                          label={"Delete"}
                        >
                          <Button
                            variant="outline"
                            border="none"
                            color={tableBtnColor}
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
                        </Tooltip>
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
