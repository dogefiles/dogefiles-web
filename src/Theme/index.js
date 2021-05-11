import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import colors from "./colors";

const CustomTheme = extendTheme({
  styles,
  colors,
});

export default CustomTheme;
