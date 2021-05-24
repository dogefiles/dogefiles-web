import {
  Button,
  VStack,
  Box,
  Divider,
  Heading,
  Tooltip,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Image,
} from "@chakra-ui/react";
import {
  FiCloud,
  FiSettings,
  // FiTrash2,
  // FiUploadCloud,
  FiDollarSign,
} from "react-icons/fi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NewButton from "./NewButton";

const NavLinks = ({ Icon, Title, onClick }) => {
  const { pathname } = useLocation();

  return (
    <Link as={RouterLink} to={`/${Title.toLowerCase()}`}>
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
          color={`${pathname.includes(Title.toLowerCase()) && "white"}`}
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
    </Link>
  );
};

const Nav = () => {
  return (
    <>
      <Box py="2">
        <Heading as="h3" size="md" my="2" color="primary.500">
          Pro User
        </Heading>
        <NewButton />
      </Box>

      <Divider />
      <NavLinks Icon={FiCloud} Title="Cloud" />
      {/* <NavLinks Icon={FiUploadCloud} Title="Upload" /> */}
      {/* <NavLinks Icon={FiTrash2} Title="Bin" /> */}
      <NavLinks Icon={FiDollarSign} Title="Earnings" />
      <NavLinks Icon={FiSettings} Title="Settings" />
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
              src="https://avatars.githubusercontent.com/u/83980120?s=200&v=4"
              alt="Logo"
              objectFit="cover"
              width="50%"
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
