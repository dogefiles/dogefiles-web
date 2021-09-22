import { Flex, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { useAuth } from "Utils/AuthContext";
// import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilesTable from "./files-table";
// import { DownloadsChart, UploadsChart } from "Components/Charts";
import FirstUploadButton from "Components/Layout/Navbar.NewButton";

export default function Cloud() {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [isError, setError] = useState(null);

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const { fetchValue } = useSelector(state => state.refetchR);

  const fetchListUploads = useCallback(async () => {
    try {
      const res = await listUploads(currentUser.uid, page);
      setData(res);
    } catch (err) {
      setError(err);
    }
  }, [currentUser, page]);

  useEffect(() => {
    return fetchListUploads();
  }, [page, fetchListUploads]);

  // const { data, refetch, isError } = useQuery(
  //   "listUploads",
  //   () => listUploads(currentUser.uid, page.current),
  //   {
  //     cacheTime: 0,
  //   }
  // );

  useEffect(() => {
    if (fetchValue !== "cloud") return;

    fetchListUploads();
    dispatch(() => dispatch({ type: "toggle" })); //this toggle will clean the last state it helps in automatic refreshing
  }, [fetchValue, fetchListUploads, dispatch]);

  // Extract downloads from the data and give it to charts
  // let downloads = null;
  // let downloadDates = [];
  // if (data) {
  //   downloads = data.map(d => d.downloads); //extracted all download objects

  //   for (let i = 0; i < downloads.length; i++) {
  //     for (let j = 0; j < downloads[i].length; j++) {
  //       downloadDates.push(downloads[i][j].createdAt);
  //     }
  //   }
  // }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cloud - Dogefiles</title>
        <meta content="Cloud - Dogefiles" property="og:title" />
        <link rel="canonical" href="https://app.dogefiles.io/cloud" />
      </Helmet>
      {!data ? (
        <VStack alignItems="center" justifyContent="center" height="100%">
          <Heading>Your ☁ is Empty</Heading>
          <FirstUploadButton />
        </VStack>
      ) : isError ? (
        <VStack alignItems="center" justifyContent="center" height="100%">
          <Heading>No more files</Heading>
          <Button mx="1" onClick={() => history.push("/")}>
            Home
          </Button>
        </VStack>
      ) : (
        <VStack align="left">
          {/* <Flex
            flexDirection={["column", "column", "column", "row"]}
            justifyContent="space-between"
          >
            {data && <DownloadsChart data={downloadDates} />}
            {data !== undefined && <UploadsChart data={data} />}
          </Flex> */}
          <Text color="gray.400">Recents</Text>
          <Flex
            overflowX="auto"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "2px",
                height: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "2px",
                height: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "pink",
                borderRadius: "24px",
              },
            }}
          >
            {data !== undefined && <FilesTable files={data} />}
          </Flex>
          <Flex justifyContent="center">
            <Button
              mx="1"
              // don't decrement if page is already 0
              onClick={() => (page === 1 ? 1 : setPage(prev => prev - 1))}
            >
              {"<<"}
            </Button>
            <Button mx="1" onClick={() => setPage(prev => prev + 1)}>
              {">>"}
            </Button>
          </Flex>
        </VStack>
      )}
    </>
  );
}
