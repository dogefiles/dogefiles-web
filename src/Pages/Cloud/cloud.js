import { Text, VStack } from "@chakra-ui/layout";
import { Skeleton, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { Link as RouterLink } from "react-router-dom";

export default function Cloud({ location }) {
  console.log(location);
  const [lod, setLod] = useState(false);
  useEffect(() => {
    setTimeout(() => setLod(true), 2000);
  }, []);
  return (
    <>
      <Skeleton isLoaded={lod} startColor="gray" endColor="gray.200">
        <VStack align="left">
          <Text color="gray.400">Recents</Text>
          <Table
            variant="simple"
            boxShadow="md"
            onContextMenu={() => alert("hello")}
          >
            <Thead boxShadow="md">
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th isNumeric>Last Modified</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Cat</Td>
                <Td>png</Td>
                <Td isNumeric>Jan/2/2019</Td>
              </Tr>
              <Tr>
                <Td>Exiad</Td>
                <Td>zip</Td>
                <Td isNumeric>Jan/1/2019</Td>
              </Tr>
              <Tr>
                <Td>Anti-Battle-Eye</Td>
                <Td>bat</Td>
                <Td isNumeric>Sep/10/2018</Td>
              </Tr>
            </Tbody>
          </Table>
        </VStack>
      </Skeleton>

      <Skeleton isLoaded={lod} startColor="gray" endColor="gray.200" my="18">
        <VStack align="left">
          <Text color="gray.400">Files</Text>
          <Table variant="simple" boxShadow="md">
            <Thead boxShadow="md">
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th isNumeric>Last Modified</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Cat</Td>
                <Td>png</Td>
                <Td isNumeric>Jan/2/2019</Td>
              </Tr>
              <Tr>
                <Td>Exiad</Td>
                <Td>zip</Td>
                <Td isNumeric>Jan/1/2019</Td>
              </Tr>
              <Tr>
                <Td>Anti-Battle-Eye</Td>
                <Td>bat</Td>
                <Td isNumeric>Sep/10/2018</Td>
              </Tr>
            </Tbody>
          </Table>

          {/* <Link as={RouterLink} to="/cloud/hi">
            Hi
          </Link> */}
        </VStack>
      </Skeleton>
    </>
  );
}
