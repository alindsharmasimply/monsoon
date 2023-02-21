import { Box } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './Sidebar';

const PlayerLayout = ({ children }) => {
  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' left='0' top='0' width='250px'>
        <Sidebar />
      </Box>
      <Box marginLeft='250px' marginBottom='100px'>
        {children}
      </Box>
      <Box left='0' position='absolute' bottom='0'>
        PLAYER
      </Box>
    </Box>
  );
};

export default PlayerLayout;
