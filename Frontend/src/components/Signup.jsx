import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Signup() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState("");
    const submitHandler=()=>{
        let payload={
            name,
            email,
            password,
            pic
        }
        console.log(payload)
    }
    const postDetails=(pics)=>{
        
    }
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Your Name "
            required
            bg={"white"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email "
            required
            bg={"white"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="passord"
            placeholder="Enter Your Password "
            required
            bg={"white"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            placeholder="Enter Your Email "
            bg={"white"}
            accept="image/*"
            value={pic}
            onChange={(e) => {
              postDetails(e.target.files[0])
            }}
          />
        </FormControl>
      </Box>
      <Box>
        <Button w={100} colorScheme="facebook" onClick={submitHandler}>
          Signup
        </Button>
      </Box>
    </Flex>
  );
}

export default Signup;
