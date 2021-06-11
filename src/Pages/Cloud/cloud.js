import { Flex, Text, VStack } from "@chakra-ui/layout";
import { Helmet } from "react-helmet";

import { useAuth } from "Utils/AuthContext";
import { useQuery } from "react-query";
import { listUploads } from "APIs/s3";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilesTable from "./files-table";
import { DownloadsChart, UploadsChart } from "Components/Charts";

export default function Cloud() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const { fetchValue } = useSelector(state => state.refetchR);

  const { isLoading, data, refetch } = useQuery("listUploads", () =>
    listUploads(currentUser.uid)
  );

  useEffect(() => {
    if (fetchValue !== "cloud") return;

    refetch();
    dispatch(() => dispatch({ type: "toggle" })); //this toggle will clean the last state it helps in automatic refreshing
  }, [fetchValue, dispatch, refetch]);

  //Extract downloads from the data and give it to charts
  // let downloads = null;
  // if (data) {
  //   downloads = data.map(d => d.downloads);
  // }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cloud - Dogefiles</title>
        <meta content="Cloud - Dogefiles" property="og:title" />
        <link rel="canonical" href="https://app.dogefiles.io/cloud" />
      </Helmet>
      {isLoading ? (
        <></>
      ) : (
        <VStack align="left">
          <Flex
            flexDirection={["column", "column", "column", "row"]}
            justifyContent="space-between"
          >
            {data && <DownloadsChart />}
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
