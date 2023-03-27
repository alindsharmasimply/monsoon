import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import GradientLayout from '../../components/GradientLayout';
import prisma from '../../lib/prisma';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { useMe } from '../../lib/hooks';

const inter = Inter({ subsets: ['latin'] });

function Home({ artists }) {
  const { user } = useMe();
  return (
    <GradientLayout
      color='red'
      roundImage={true}
      subtitle='profile'
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} Public Playlists`}
      image='user-profile.png'
    >
      <Box color='white' paddingX='40px'>
        <Box marginBottom='40px'>
          <Text fontSize='2xl' fontWeight='bold'>
            Top artist this month
          </Text>
          <Text fontSize='md'>only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box bg='gray.900' borderRadius='4px' padding='15px' width='100%'>
              <Image
                src='avatar.jpg'
                alt='artist-profile'
                borderRadius='100%'
              />
              <Box marginTop='10px'>
                <Text fontSize='large'>{artist.name}</Text>
                <Text fontSize='x-small'>Artist</Text>
              </Box>
              {artist.name}
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  console.log(artists);
  return {
    props: { artists: JSON.parse(JSON.stringify(artists)) },
  };
};

export default Home;
