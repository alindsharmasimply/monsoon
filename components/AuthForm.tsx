import NextImage from 'next/image';
import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { auth } from '../lib/mutations';

const AuthForm: FC<{ mode: 'signup' | 'signin' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, { email, password });
    setIsLoading(false);
    router.push('/');
  };
  return (
    <Box height='100vh' width='100vw' bg='black' color='white'>
      <Flex justify='center' align='center' height='100px' borderBottom='solid'>
        <NextImage src='/logo-white.svg' alt='logo' height={60} width={95} />
      </Flex>
      <Flex justify='center' align='center' height='calc(100vh - 100px)'>
        <Box padding='50px' bg='gray.900' borderRadius='6px'>
          <form onSubmit={handleSubmit}>
            <Stack>
              <Input
                border='solid'
                bg='gray.900'
                placeholder='email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                border='solid'
                bg='gray.900'
                placeholder='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                bg='green.500'
                isLoading={isLoading}
                sx={{
                  '&:hover': {
                    bg: 'green.300',
                  },
                }}
              >
                {mode}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
