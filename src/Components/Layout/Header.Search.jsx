import {
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function HeaderSearch() {
  const inputBg = useColorModeValue("white", "gray.800");

  return (
    <>
      <InputGroup>
        <Input id="searchtable" placeholder="Search in Cloud" bg={inputBg} />
        <InputRightElement children={<FiSearch />} color="primary.500" />
      </InputGroup>
    </>
  );
}
