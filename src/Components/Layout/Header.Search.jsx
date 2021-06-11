import {
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function HeaderSearch() {
  const inputBg = useColorModeValue("white", "gray.800");
  const [term, setTerm] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!term) return;

    history.push(`/cloud/${term}`);
  }, [term, history]);

  return (
    <>
      <InputGroup>
        <Input
          id="searchtable"
          placeholder="Search in Cloud"
          bg={inputBg}
          onKeyDown={e => {
            if (e.keyCode === 13) setTerm(e.target.value);
          }}
        />
        <InputRightElement children={<FiSearch />} color="primary.500" />
      </InputGroup>
    </>
  );
}
