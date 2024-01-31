import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chat");
    }
  }, [navigate]);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        border={"1px solid black"}
        mt={"40px"}
        w={"100%"}
        textAlign={"center"}
        p={"20px"}
        bg={"whitesmoke"}
        borderRadius={"10"}
      >
        <Heading>CHATIFY</Heading>
      </Box>
      <Box
        w={"100%"}
        mt={10}
        bgGradient="linear(to-r, teal.500, green.500)"
        p={5}
        borderRadius={10}
      >
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mt={5} ml={"5%"}>
            <Tab
              w={"45%"}
              bgGradient="linear(to-r, teal.500, green.500)"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
            >
              Login
            </Tab>
            <Tab
              w={"45%"}
              bgGradient="linear(to-r, teal.500, green.500)"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
            >
              SignUp
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel mt={5}>{<Login />}</TabPanel>
            <TabPanel mt={5}>{<Signup />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;
