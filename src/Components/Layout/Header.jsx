import {
  // Layout
  HStack,
  // Wrap
  Wrap,
  WrapItem,
  // Media
  Avatar,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiLogOut, FiSettings, FiMenu } from "react-icons/fi";
import { useAuth } from "Utils/AuthContext";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import HeaderSearch from "./Header.Search";

const Header = ({ showSidebarButton, onShowSidebar }) => {
  const { logout, currentUser } = useAuth();
  const { pathname } = useLocation();

  const borderBottomColor = useColorModeValue("gray.200", "gray.600");

  return (
    // <HStack width="100%" paddingX="1" height="14">
    <HStack
      width="100%"
      paddingX="1"
      py="1"
      height="14"
      borderBottom="1px"
      borderColor={borderBottomColor}
      justifyContent="space-between"
    >
      <HStack>
        {showSidebarButton && (
          <IconButton
            icon={<FiMenu w={8} h={8} />}
            border="none"
            _focus={{ border: "none" }}
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
        <Image
          display={["none", "none", "block", "block"]}
          // padding="2"
          // src="https://avatars.githubusercontent.com/u/83980120?s=200&v=4"
          src="/dogefiles_logo.png"
          alt="Logo"
          objectFit="cover"
          // width="4.5rem"
          width="10rem"
        />
      </HStack>

      <HStack flex={pathname === "/cloud" && 1}>
        {pathname.includes("/cloud") && <HeaderSearch />}
        <ThemeToggle />
        <Menu>
          <MenuButton>
            <Wrap>
              <WrapItem>
                <Avatar
                  name="Dogefiles"
                  // src="https://i1.sndcdn.com/avatars-000459287565-8boqnr-t500x500.jpg"
                  src={currentUser.photoURL}
                  size="sm"
                />
              </WrapItem>
            </Wrap>
          </MenuButton>

          <MenuList>
            <MenuItem minH="48px" onClick={() => alert("hello")}>
              <Icon
                as={FiSettings}
                color="primary.500"
                icon={<FiSettings />}
                mr="12px"
              />
              <span>Settings</span>
            </MenuItem>
            <MenuItem minH="40px" onClick={() => logout()}>
              <Icon
                as={FiLogOut}
                color="primary.500"
                icon={<FiSettings />}
                mr="12px"
              />
              <span>Logout</span>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Header;
