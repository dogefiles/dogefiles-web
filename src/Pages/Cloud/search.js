import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import FilesTable from "./files-table";
import { Text, Link } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { useAuth } from "Utils/AuthContext";
import { listUploads } from "APIs/s3";

export default function Folder() {
  const { search } = useParams();
  const { currentUser } = useAuth();
  const [fileNames, setFileNames] = useState([]);

  const { data, refetch } = useQuery("listUploads", () =>
    listUploads(currentUser.uid)
  );

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  useEffect(() => {
    if (!data) return;
    const getFileNames = data.filter(file =>
      file.fileName.toLowerCase().includes(search.toLowerCase())
    );
    setFileNames(getFileNames);
  }, [data, search]);

  return (
    <>
      <Link display={["block", "block", "none", "none"]} as={ReactLink} to="/">
        <FiArrowLeft />
      </Link>
      {!data || fileNames.length === 0 ? (
        <Text>Nothing found</Text>
      ) : (
        <FilesTable files={fileNames} />
      )}
    </>
  );
}
