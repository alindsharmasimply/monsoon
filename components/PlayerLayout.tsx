import { Box } from '@chakra-ui/react';
import React from 'react';
import PlayerBar from './PlayerBar';
import Sidebar from './Sidebar';

const PlayerLayout = ({ children }) => {
  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' left='0' top='0' width='250px'>
        <Sidebar />
      </Box>
      <Box marginLeft='250px' marginBottom='100px'>
        <Box height='calc(100vh - 100px)'>{children}</Box>
      </Box>
      <Box left='0' position='absolute' bottom='0'>
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
