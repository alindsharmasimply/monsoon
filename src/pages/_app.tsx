import type { AppProps } from 'next/app';
import { ChakraProvider, extendBaseTheme, extendTheme } from '@chakra-ui/react';
import 'reset-css';
import PlayerLayout from '../../components/PlayerLayout';
import { NextComponentType } from 'next';
import { StoreProvider } from 'easy-peasy';
import { store } from '../../lib/store';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean }; // add authPage type
};

const theme = extendBaseTheme({
  colors: {
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxshadow: 'none',
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
}
