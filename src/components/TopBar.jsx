import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import logo from '../assets/Logos.png';  // Import the logo image

const TopBar = () => {
  return (
    <Box
      as="header"
      w="100%"
      p={4}
      color="white"
      display="flex"
      alignItems="left"
    >
      <Image
        src={logo} // Use the imported logo
        h="30px" // Adjust the height as needed
        alt="Logo"
      />
    </Box>
  );
};

export default TopBar;
