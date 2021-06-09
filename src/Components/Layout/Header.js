import {
  // Layout
  HStack,
  // Input
  InputGroup,
  Input,
  InputRightElement,
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
import { FiLogOut, FiSettings, FiMenu, FiSearch } from "react-icons/fi";
import { useAuth } from "Utils/AuthContext";
import { useLocation } from "react-router-dom";
import ThemeToggle from "Components/ThemeToggle";

const Header = ({ showSidebarButton, onShowSidebar }) => {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const inputBg = useColorModeValue("white", "gray.800");
  const borderBottomColor = useColorModeValue("gray.200", "gray.600");
  return (
    // <HStack width="100%" paddingX="1" height="14">
    <HStack
      width="100%"
      paddingX="1"
      height="14"
      borderBottom="1px"
      borderColor={borderBottomColor}
      justifyContent="space-between"
    >
      <HStack>
        {showSidebarButton && (
          <IconButton
            icon={<FiMenu w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
        <Image
          padding="2"
          src="https://avatars.githubusercontent.com/u/83980120?s=200&v=4"
          alt="Logo"
          objectFit="cover"
          width="4.5rem"
        />
      </HStack>

      <HStack flex={pathname === "/cloud" && 1}>
        {pathname === "/cloud" && (
          <InputGroup>
            <Input placeholder="Search in Cloud" bg={inputBg} />
            <InputRightElement
              children={<FiSearch />}
              onClick={() => alert("Search")}
              color="primary.500"
            />
          </InputGroup>
        )}
        <ThemeToggle />
        <Menu>
          <MenuButton>
            <Wrap>
              <WrapItem>
                <Avatar
                  name="Dogefiles"
                  src="https://i1.sndcdn.com/avatars-000459287565-8boqnr-t500x500.jpg"
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
            <MenuItem minH="40px" onClick={logout}>
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
