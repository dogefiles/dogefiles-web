import { Tooltip, Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { UPLOADS_ON } from "State/constants";

export default function NewButton() {
  const dispatch = useDispatch();

  const updateUploadManager = e => {
    const files = [...e.target.files];

    dispatch({ type: UPLOADS_ON, payload: files });
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
