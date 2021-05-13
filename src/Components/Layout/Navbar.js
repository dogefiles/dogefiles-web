// import {
//   Button,
//   VStack,
//   Box,
//   Divider,
//   Heading,
//   Tooltip,
//   Link,
// } from "@chakra-ui/react";
// import { FiCloud, FiSettings, FiTrash2, FiPlus } from "react-icons/fi";
// import { Link as RouterLink } from "react-router-dom";

// const NavLinks = ({ Icon, Title }) => {
//   return (
//     <Link as={RouterLink} to={Title.toLowerCase()}>
//       <Tooltip hasArrow label={Title} placement="right" color="white" bg="pink">
//         <Button
//           leftIcon={<Icon />}
//           variant="outline"
//           justifyContent="left"
//           width="100%"
//         >
//           {Title}
//         </Button>
//       </Tooltip>
//     </Link>
//   );
// };

// export default function Navbar() {
//   return (
//     <VStack alignItems="left" width="60" px="2">
//       <Box py="2">
//         <Heading as="h3" size="md" my="2" color="teal">
//           Pro User
//         </Heading>
//         <Tooltip hasArrow label="New" placement="right" color="white" bg="pink">
//           <Button
//             leftIcon={<FiPlus />}
//             color="blue.500"
//             variant="outline"
//             boxShadow="sm"
//             _hover={{ color: "white", bg: "blue.500" }}
//           >
//             New
//           </Button>
//         </Tooltip>
//       </Box>

//       <Divider />
//       <NavLinks Icon={FiCloud} Title="Cloud" />
//       <NavLinks Icon={FiTrash2} Title="Bin" />
//       <NavLinks Icon={FiSettings} Title="Settings" />
//     </VStack>
//   );
// }
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
  FiTrash2,
  FiPlus,
  FiUploadCloud,
} from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const NavLinks = ({ Icon, Title, onClick }) => {
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
        <Tooltip
          hasArrow
          label="New"
          placement="right"
          color="white"
          bg="primary.400"
        >
          <Button
            leftIcon={<FiPlus />}
            color="white"
            bg="primary.400"
            variant="outline"
            boxShadow="sm"
            _hover={{ color: "white", bg: "primary.500" }}
          >
            New
          </Button>
        </Tooltip>
      </Box>

      <Divider />
      <NavLinks Icon={FiCloud} Title="Cloud" />
      <NavLinks Icon={FiUploadCloud} Title="Upload" />
      <NavLinks Icon={FiTrash2} Title="Bin" />
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
