import { Tooltip, Button, useToast } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { UPLOADS_ON } from "State/constants";
import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";

const uploadLimitter = (data, files) => {
  let spaceUsed = 0;
  let filesSize = 0;
  let spaceLeft = 20;
  data.forEach(file => (spaceUsed += file.fileSize));
  spaceUsed = spaceUsed / 1e9; //GB

  files.forEach(file => (filesSize += file.size));
  filesSize = filesSize / 1e9; //GB

  spaceLeft = spaceLeft - spaceUsed;

  if (filesSize < spaceLeft) return true;
  return false;
};

export default function NewButton() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const { data, refetch } = useQuery("listUploads", () =>
    listUploads(currentUser.uid)
  );

  const updateUploadManager = e => {
    let files = [...e.target.files];
    if (data) {
      if (!uploadLimitter(data, files)) {
        files = [];
        return toast({
          title: `You don't have enough storage available, Please Upgrade`,
          status: "error",
          isClosable: true,
        });
      }
    }
    if (files.length > 20) {
      return toast({
        title: `You can't upload more than 20 files at once`,
        status: "error",
        isClosable: true,
      });
    }
    //Prevent large files from uploading
    const updatedFiles = files.filter(file => {
      if (file.size > 1.01e8) {
        toast({
          title: `${file.name} is removed due to large size !`,
          status: "warning",
          isClosable: true,
        });
        toast({
          title: `Max Limit is 100MB`,
          status: "success",
          isClosable: true,
        });
        return null;
      }
      return file;
    });
    if (updatedFiles.length === 0) return;

    dispatch({ type: UPLOADS_ON, payload: updatedFiles });
    refetch();
  };

  return (
    <>
      <input
        id="upload"
        type="file"
        multiple
        hidden
        onChange={e => updateUploadManager(e)}
      />
      <label htmlFor="upload">
        <Tooltip
          hasArrow
          label="New"
          placement="right"
          color="white"
          bg="primary.500"
        >
          <Button
            as="div"
            aria-label="Options"
            leftIcon={<FiPlus />}
            color="white"
            bg="primary.400"
            variant="outline"
            boxShadow="sm"
            p="2"
            _hover={{ color: "white", bg: "primary.500" }}
          >
            New
          </Button>
        </Tooltip>
      </label>
    </>
  );
}
