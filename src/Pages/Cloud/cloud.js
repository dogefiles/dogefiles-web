import { Flex, Text, VStack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilesTable from "./files-table";
import LineChart from "Components/LineChart";

export default function Cloud() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { fetchValue } = useSelector(state => state.refetchR);

  const { isLoading, data, refetch } = useQuery(
    "listUploads",
    () => listUploads(currentUser.uid),
    {
      cacheTime: 1,
    }
  );

  useEffect(() => {
    if (fetchValue !== "cloud") return;

    refetch();
    dispatch(() => dispatch({ type: "toggle" }));
  }, [fetchValue, dispatch, refetch]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cloud - Dogefiles</title>
        <meta content="Cloud - Dogefiles" property="og:title" />
        <link rel="canonical" href="https://app.dogefiles.io/cloud" />
      </Helmet>
      <Skeleton
        // isLoaded={files.length !== 0}
        isLoaded={!isLoading}
        startColor="gray"
        endColor="gray.200"
      >
        <VStack align="left">
          <LineChart />
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
            {!isLoading && <FilesTable files={data} />}
          </Flex>
        </VStack>
      </Skeleton>
    </>
  );
}
