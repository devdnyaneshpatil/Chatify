import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

function Login() {
  return (
    <Flex flexDirection={"column"}>
      <Box>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter Your Email " required />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="passord" placeholder="Enter Your Password " required />
        </FormControl>
      </Box>
      <Box>
        <Button>Login</Button>
      </Box>
    </Flex>
  );
}

export default Login