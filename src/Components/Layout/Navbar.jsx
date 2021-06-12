import {
  Button,
  VStack,
  Box,
  Divider,
  // Heading,
  Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Image,
  useColorModeValue,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import {
  FiCloud,
  FiSettings,
  // FiTrash2,
  // FiUploadCloud,
  FiDollarSign,
} from "react-icons/fi";
import { Link as ReactLink, useLocation } from "react-router-dom";
import NewButton from "./Navbar.NewButton";
import Storage from "./Navbar.Storage";

const NavLinks = ({ Icon, Title, onClick }) => {
  const { pathname } = useLocation();
  const navBtnColor = useColorModeValue("gray.600", "gray.400");
  return (
    <ReactLink to={`/${Title.toLowerCase()}`}>
      <Tooltip
        hasArrow
        label={Title}
        placement="right"
        color="white"
        bg="primary.500"
      >
        <Button
          leftIcon={<Icon />}
          variant="outline"
          justifyContent="left"
          width="100%"
          // color={`${pathname.includes(Title.toLowerCase()) && "white"}`}
          color={`${
            pathname.includes(Title.toLowerCase()) ? "white" : navBtnColor
          }`}
          bg={`${pathname.includes(Title.toLowerCase()) && "primary.500"}`}
          onClick={onClick}
          _hover={{
            color: "white",
            bg: "primary.400",
          }}
        >
          {Title}
        </Button>
      </Tooltip>
    </ReactLink>
  );
};

const Nav = () => {
  return (
    <>
      <Box py="2">
        <Box mt={2} mb={4}>
          <Tag size="lg" variant="outline" colorScheme="green">
            <TagLabel>Free user</TagLabel>
          </Tag>
        </Box>
        <NewButton />
      </Box>

      <Divider />
      <NavLinks Icon={FiCloud} Title="Cloud" />
      {/* <NavLinks Icon={FiUploadCloud} Title="Upload" /> */}
      {/* <NavLinks Icon={FiTrash2} Title="Bin" /> */}
      <NavLinks Icon={FiDollarSign} Title="Earnings" />
      <NavLinks Icon={FiSettings} Title="Settings" />

      {/* Storage  */}
      <Storage />
    </>
  );
};

export default function Navbar({ isOpen, variant, onClose }) {
  return variant === "sidebar" ? (
    <VStack alignItems="left" width="60" px="2">
      <Nav />
    </VStack>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="primary.500" fontSize="4xl">
            <Image
              // src="https://avatars.githubusercontent.com/u/83980120?s=200&v=4"
              src="/dogefiles_logo.png"
              alt="Logo"
              objectFit="cover"
              width="80%"
            />
          </DrawerHeader>
          <DrawerBody>
            <Nav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
