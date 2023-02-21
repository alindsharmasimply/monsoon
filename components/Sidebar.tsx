import NextImage from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { MdHome, MdLibraryMusic, MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
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
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Box
      height='calc(100vh - 100px)'
      width='100%'
      bg='black'
      paddingX='5px'
      color='gray'
    >
      <Box paddingY='20px'>
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
      </Box>
    </Box>
  );
};

export default Sidebar;
