import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from 'react-icons/md';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const navMenu = [
    {
      name: 'Home',
      icon: MdHome,
      route: '/',
    },
    {
      name: 'Search',
      icon: MdSearch,
      route: '/search',
    },
    {
      name: 'Your Library',
      icon: MdLibraryMusic,
      route: '/library',
    },
  ];
  const musicMenu = [
    {
      name: 'Create Playlist',
      icon: MdPlaylistAdd,
      route: '/',
    },
    {
      name: 'Favorites',
      icon: MdFavorite,
      route: '/favorites',
    },
  ];
  const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);
  return (
    <Box
      height='calc(100vh - 100px)'
      width='100%'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px' height='100%'>
        <Box width='120px' marginBottom='20px' paddingX='10px'>
          <NextImage
            src='/logo-white.svg'
            height={70}
            width={120}
            alt='Company Logo Here'
          />
        </Box>
        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color='white'
                        marginRight='20px'
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginTop='20px'>
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color='white'
                        marginRight='20px'
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color='gray.800' />
        <Box height='57%' overflowY='auto' paddingY='20px'>
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem paddingX='20px' key={playlist}>
                <LinkBox>
                  <NextLink href='/'>
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
