import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  // set mobile view on menu
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // call for change states
  const dispatch = useDispatch();
  // handle navigate
  const navigate = useNavigate();
  // grab the user infromation from the state
  const user = useSelector((state) => state.user);
  // useMediaQuery() is a  mui hook that used to deside if the screen size is low or high than given width.
  const isNonMobileScreen = useMediaQuery("(min-width:100px");
  // instatiate the theme
  const theme = useTheme();
  // set up different colors from theme
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.neutral.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  // when using clamp, we can set 3 values for font size, it will pick the preffered one according to screen size
  // sx is how to add psudo styles like at hover...
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}>
          Buzz-Budies...
        </Typography>
        {/* if non mobile screen show search box */}
        {isNonMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem">
            <InputBase placeholder="Search.." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreen ? (
        <FlexBetween gap="2rem"></FlexBetween>
      ) : (
        <IconButton onClick={() => dispatch(setMode())}></IconButton>
      )}
    </FlexBetween>
  );
};
export default Navbar;
