import { Flex, Text, VStack, Heading } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilesTable from "./files-table";
import { DownloadsChart, UploadsChart } from "Components/Charts";
import FirstUploadButton from "Components/Layout/Navbar.NewButton";

export default function Cloud() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const { fetchValue } = useSelector(state => state.refetchR);

  const { isLoading, data, refetch, isError } = useQuery(
    "listUploads",
    () => listUploads(currentUser.uid),
    {
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (fetchValue !== "cloud") return;

    refetch();
    dispatch(() => dispatch({ type: "toggle" })); //this toggle will clean the last state it helps in automatic refreshing
  }, [fetchValue, dispatch, refetch]);

  // Extract downloads from the data and give it to charts
  let downloads = null;
  let downloadDates = [];
  if (data) {
    downloads = data.map(d => d.downloads); //extracted all download objects

    for (let i = 0; i < downloads.length; i++) {
      for (let j = 0; j < downloads[i].length; j++) {
        downloadDates.push(downloads[i][j].createdAt);
      }
    }
  }

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
          <Heading>Opps there was an error</Heading>
        </VStack>
      ) : (
        <VStack align="left">
          <Flex
            flexDirection={["column", "column", "column", "row"]}
            justifyContent="space-between"
          >
            {data && <DownloadsChart data={downloadDates} />}
            {data !== undefined && <UploadsChart data={data} />}
          </Flex>
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
        </VStack>
      )}
    </>
  );
}
