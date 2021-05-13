import React, { useState } from "react";
import { Redirect, Switch } from "react-router-dom";
import PrivateRoute from "Components/PrivateRoute";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Header, Navbar } from "Components/Layout";
import { Cloud, Folder } from "Pages/Cloud";
import { Bin } from "Pages/Bin";
import Upload from "Components/Upload";
import { Settings } from "Pages/Settings";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function MainNavigator() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    // es flex ki height 100vh and overflow bhot important thi
    <Flex
      overflow="hidden"
      flexDirection="column"
      height="100vh"
      onContextMenu={e => e.preventDefault()}
    >
      <Header
        showSidebarButton={variants?.navigationButton}
        onShowSidebar={toggleSidebar}
      />
      <Flex margin="0" padding="0" height="100%">
        <Flex>
          <Flex
            flexDirection="column"
            borderRight="1px"
            borderColor="gray.200"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "pink",
                borderRadius: "24px",
              },
            }}
          >
            {/* Place Navbar in this grid */}
            <Navbar
              variant={variants?.navigation}
              isOpen={isSidebarOpen}
              onClose={toggleSidebar}
            />
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          overflowY="auto"
          width="100%"
          p="2"
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "pink",
              borderRadius: "24px",
            },
          }}
        >
          <Switch>
            <PrivateRoute exact path="/">
              <Redirect to="/cloud" />
            </PrivateRoute>

            <PrivateRoute exact path="/cloud" component={Cloud}></PrivateRoute>
            <PrivateRoute
              exact
              path="/cloud/:folder"
              component={Folder}
            ></PrivateRoute>

            <PrivateRoute
              exact
              path="/upload"
              component={Upload}
            ></PrivateRoute>

            <PrivateRoute path="/bin" component={Bin}></PrivateRoute>

            <PrivateRoute path="/settings" component={Settings}></PrivateRoute>
          </Switch>
        </Flex>
        {/* <div>Footer</div> */}
      </Flex>
    </Flex>
  );
}
