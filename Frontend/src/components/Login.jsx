import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const toast=useToast()
  const submitHandler =async () => {
    setLoading(true)
    
    if(!email||!password){
      toast({
        title:"Please Fill all the fields",
        status:"warning",
        duration:2000,
        isClosable:true
      })
      setLoading(false);
      return
    }
    const payload = {
      email,
      password,
    };
    console.log(payload)
    try {
       const response = await axios.post(
         "http://localhost:8080/users/login",
         payload,
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       console.log(response.data)
       setLoading(false)
       toast({
        title:response.data.msg,
        status:"success",
        duration:5000,
        isClosable:true
       })
       if (response.data.msg == "Login Successfull") {
         localStorage.setItem(
           "userInfo",
           JSON.stringify(response.data.user)
         );
         navigate("/chat");
       }
    } catch (error) {
      console.log(error.message)
      setLoading(false);
      toast({
        title:"Error While Logging in",
        description:error.message,
        status:"error",
        duration:5000,
        isClosable:true
      })   
    }
  };
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
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
            type="password"
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
      <Box>
        <Button w={100} colorScheme="facebook" onClick={submitHandler} isLoading={loading}>
          Login
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
