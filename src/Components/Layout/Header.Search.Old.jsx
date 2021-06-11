import {
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "react-query";
import { useAuth } from "Utils/AuthContext";
import { listUploads } from "APIs/s3";

export default function HeaderSearch() {
  const inputBg = useColorModeValue("white", "gray.800");
  const [fileNames, setFileNames] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const [term, setTerm] = useState("");

  const { currentUser } = useAuth();
  const { data, isLoading } = useQuery("listUploads", () =>
    listUploads(currentUser.uid)
  );

  useEffect(() => {
    if (data) {
      const getFileNames = data.map(file => file.fileName);
      setFileNames(getFileNames);
    }
  }, [data]);

  useEffect(() => {
    setSearchedFiles(
      fileNames.filter(file => file.toLowerCase().includes(term.toLowerCase()))
    );
  }, [term, fileNames]);

  return (
    <>
      <InputGroup>
        <Input
          id="searchtable"
          placeholder="Search in Cloud"
          bg={inputBg}
          onChange={e => {
            setTerm(e.target.value);
          }}
        />
        <InputRightElement children={<FiSearch />} color="primary.500" />
      </InputGroup>

      {term && searchedFiles.length !== 0 && (
        <Box
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
          // width={["300px", "480px", "600px", "88%"]}
          width="inherit"
          height="40%"
          overflowY="auto"
          bg="gray.800"
          color="gray.200"
          rounded="md"
          shadow="md"
          zIndex="10"
          position="fixed"
          top="50"
          // left={["3.2rem", "50", "30", "70"]}
        >
          {!isLoading && (
            <List>
              {searchedFiles.map((file, index) => (
                <ListItem
                  p={["6px", "6px", "3", "4"]}
                  borderBottom="1px"
                  borderColor="gray.400"
                  bg="gray.700"
                  key={index}
                >
                  {file}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </>
  );
}
