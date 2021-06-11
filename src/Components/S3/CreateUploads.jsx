import { useState, useEffect, useRef } from "react";
import Axios from "Utils/Axios";
import axios, { CancelToken } from "axios";
import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useAuth } from "Utils/AuthContext";
import { useSelector } from "react-redux";

import { presignedUrl, saveFileToDB } from "APIs/s3";
import { FiX } from "react-icons/fi";
import { TypeIdentifier } from "Components/Others";
import { useDispatch } from "react-redux";

const getPresignedUrl = async (fileInfo, config) => {
  const { data } = await presignedUrl(fileInfo, config);
  return data;
};

function PleaseUpload({ file }) {
  const { getUserToken, currentUser } = useAuth();
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const cancelUpload = () => {
    if (cancelFileUpload.current)
      cancelFileUpload.current("User has canceled the file upload.");
  };

  useEffect(() => {
    startUpload(file);
    // eslint-disable-next-line
  }, []);

  const [uploadPercentage, setUploadPercentage] = useState(0);
  const cancelFileUpload = useRef(null);

  const startUpload = async file => {
    const userToken = await getUserToken();

    const fileInfo = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const { url, fields } = await getPresignedUrl(fileInfo, config);

    const preSignedFileInfo = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      key: fields.key,
      firebaseId: currentUser.uid,
    };

    const data = {
      bucket: "meow0007",
      ...fields,
      "Content-Type": file.type,
      file: file,
    };

    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }

    // Upload File to Presigned Url
    await Axios.post(url, formData, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;

        let percent = Math.floor((loaded * 100) / total);

        if (percent <= 100) {
          setUploadPercentage(percent);
        }
      },
      cancelToken: new CancelToken(
        cancel => (cancelFileUpload.current = cancel)
      ),
    })
      .then(async res => {
        console.log(res);
        if (res.status !== 204) {
          throw Error("Error while uploading");
        }

        setTimeout(() => {
          setUploadPercentage(0);
        }, 1000);

        //save file to DB
        await saveFileToDB(preSignedFileInfo);
        dispatch(() => dispatch({ type: "cloud" }));
      })
      .catch(err => {
        console.log(err.message);
        if (axios.isCancel(err)) {
          console.log("Upload Cancelled", err.message);
        }
        setUploadPercentage(0);
      });
  };

  return (
    <>
      {uploadPercentage !== 0 && (
        <Flex
          alignItems="center"
          borderBottom="1px"
          borderRadius="6px"
          px={1}
          borderColor="primary.400"
          mt={0.5}
          width="100%"
          justifyContent="space-between"
        >
          <HStack>
            <TypeIdentifier fileType={file.type} />
            <Text>{file.name}</Text>
          </HStack>
          <HStack>
            <Box>
              <CircularProgress
                value={uploadPercentage}
                color="green.400"
                size="2rem"
              >
                <CircularProgressLabel>
                  {uploadPercentage}%
                </CircularProgressLabel>
              </CircularProgress>
            </Box>

            {/* Cancel Upload Button */}
            <Popover isOpen={toggle}>
              <PopoverTrigger>
                <IconButton
                  aria-label="Cancel upload"
                  icon={<FiX />}
                  size="sm"
                  borderRadius="50%"
                  bg="white"
                  _hover={{ bg: "red.400" }}
                  onClick={() => setToggle(!toggle)}
                />
              </PopoverTrigger>
              {toggle && (
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Cancel Upload</PopoverHeader>
                  <PopoverBody>
                    Are you sure you want to cancel the upload?
                  </PopoverBody>
                  <PopoverFooter alignContent="right">
                    <Button
                      ml={170}
                      onClick={() => {
                        cancelUpload();
                        setToggle(!toggle);
                      }}
                    >
                      Yes
                    </Button>
                    <Button ml={2} onClick={() => setToggle(!toggle)}>
                      No
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              )}
            </Popover>
          </HStack>
        </Flex>
      )}
    </>
  );
}

export default function CreateUploads() {
  const { files } = useSelector(state => state.uploadManager);
  console.log(files);
  return (
    <>
      {files.map(file =>
        file.map((f, index) => {
          return <PleaseUpload key={index} file={f} />;
        })
      )}
    </>
  );
}
