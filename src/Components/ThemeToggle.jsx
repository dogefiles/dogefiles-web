import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="outline"
      border="none"
      _focus={{ border: "none" }}
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
