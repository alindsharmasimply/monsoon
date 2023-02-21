import type { AppProps } from 'next/app';
import { ChakraProvider, extendBaseTheme, extendTheme } from '@chakra-ui/react';
import 'reset-css';
import PlayerLayout from '../../components/PlayerLayout';

const theme = extendBaseTheme({
  colors: {
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
    </ChakraProvider>
  );
}
