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
} from "@chakra-ui/react";
import { FcSearch } from "react-icons/fc";
import { FiLogOut, FiSettings, FiMenu } from "react-icons/fi";
import { useAuth } from "Utils/AuthContext";
import { useLocation } from "react-router-dom";

const Header = ({ showSidebarButton, onShowSidebar }) => {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  return (
    // <HStack width="100%" paddingX="1" height="14">
    <HStack
      width="100%"
      paddingX="1"
      height="14"
      borderBottom="1px"
      borderColor="gray.200"
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
          src="https://i.postimg.cc/MG5K9Y6q/kisspng-cloud-computing-logo-dedicated-hosting-service-clouds-5ab45ad1a90225-0895814115217691696923.png"
          alt="Logo"
          objectFit="cover"
          width="4.5rem"
        />
      </HStack>

      <HStack flex={pathname === "/cloud" && 1}>
        {pathname === "/cloud" && (
          <InputGroup>
            <Input placeholder="Search in Cloud" bg="white" />
            <InputRightElement
              children={<FcSearch />}
              onClick={() => alert("Search")}
            />
          </InputGroup>
        )}

        <Menu>
          <MenuButton>
            <Wrap>
              <WrapItem>
                <Avatar
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                  size="sm"
                />
              </WrapItem>
            </Wrap>
          </MenuButton>

          <MenuList>
            <MenuItem minH="48px" onClick={() => alert("hello")}>
              <Icon
                as={FiSettings}
                color="blue.500"
                icon={<FiSettings />}
                mr="12px"
              />
              <span>Settings</span>
            </MenuItem>
            <MenuItem minH="40px" onClick={logout}>
              <Icon
                as={FiLogOut}
                color="blue.500"
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
