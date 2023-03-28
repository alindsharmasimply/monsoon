import { Box } from '@chakra-ui/layout';
import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { formatDate, formatTime } from '../lib/formatters';
import { useStoreActions } from 'easy-peasy';

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);
  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };
  return (
    <Box bg='transparent' color='white'>
      <Box padding='10px' marginBottom='20px'>
        <Box marginBottom='20px'>
          <IconButton
            icon={<BsFillPlayCircleFill fontSize='30px' color='green' />}
            aria-label='play'
            colorScheme='white'
            size='lg'
            isRound
            backgroundColor='white'
            _hover={{
              backgroundColor: 'green.800',
              border: 'solid',
              borderColor: 'white',
            }}
            onClick={() => handlePlay()}
          />
        </Box>
        <TableContainer>
          <Table
            variant='simple'
            width='100%'
            style={{
              borderSpacing: '20px',
              borderCollapse: 'separate',
            }}
          >
            <Thead
              borderBottom='1px solid'
              borderColor='rgba(255, 255, 255, 0.2)'
              textAlign='left'
            >
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Date Added</Th>
                <Th>
                  <AiOutlineClockCircle />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {songs.map((song, index) => (
                <Tr
                  sx={{
                    transition: 'all .3s',
                    '&:hover': {
                      bg: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  key={song.id}
                  cursor='pointer'
                  onClick={() => handlePlay(song)}
                >
                  <Td>{index + 1}</Td>
                  <Td>{song.name}</Td>
                  <Td>{formatDate(song.createdAt)}</Td>
                  <Td>{formatTime(song.duration)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SongsTable;
