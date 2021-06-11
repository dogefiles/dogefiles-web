import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import FilesTable from "./files-table";
import { Text } from "@chakra-ui/layout";

export default function Folder() {
  const { search } = useParams();
  const [fileNames, setFileNames] = useState([]);
  const useQuery = useQueryClient();

  const data = useQuery.getQueryData("listUploads");

  useEffect(() => {
    const getFileNames = data.filter(file =>
      file.fileName.toLowerCase().includes(search.toLowerCase())
    );
    setFileNames(getFileNames);
  }, [data, search]);

  return (
    <>
      {fileNames.length === 0 ? (
        <Text>Nothing found</Text>
      ) : (
        <FilesTable files={fileNames} />
      )}
    </>
  );
}
