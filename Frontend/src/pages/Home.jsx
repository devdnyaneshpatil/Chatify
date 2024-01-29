import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Login";

function Home() {
  return (
    <Container maxW={"xl"} centerContent border="1px solid red">
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
      <Box w={"100%"} mt={10}>
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mt={5}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel border={"2px solid black"} mt={5} >{<Login />}</TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;
