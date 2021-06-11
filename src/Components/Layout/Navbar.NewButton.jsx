import { Tooltip, Button, useToast } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { UPLOADS_ON } from "State/constants";

export default function NewButton() {
  const toast = useToast();
  const dispatch = useDispatch();

  const updateUploadManager = e => {
    const files = [...e.target.files];
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
  };

  return (
    <>
      <input
        id="upload"
        type="file"
        multiple
        hidden
        onChange={updateUploadManager}
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
