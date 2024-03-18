import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Guide() {
  return (
    <Box bgColor={"#ebebeb"} w={"100%"} pt={4}>
      <Container maxW={"1000px"}>
        <Flex justify={"flex-end"}>
          <HStack gap={8}>
            <Link textDecor={"underline"}>About</Link>
            <Link textDecor={"underline"}>Contact Us</Link>
            <Link textDecor={"underline"} as={RouterLink} to={"/guide"}>
              How To Use
            </Link>
          </HStack>
        </Flex>

        <Flex pt={8} align={"start"}>
          <VStack flex={1} justify={"center"} gap={4}>
            <RouterLink to={"/"}>
              <Heading as={"h1"} size={"3xl"} color={"#f054b0"}>
                INSTACHAT
              </Heading>
            </RouterLink>
            <Heading as={"h2"} size={"2xl"} color={"#737373"}>
              A quick guide
            </Heading>
            <div>
              <br />
            </div>
            <Box
              bgColor={"#A5DDFF"}
              width={"600px"}
              borderRadius={"50px"}
              padding={2}
              textAlign={"center"}
            >
              <Heading size="lg" fontSize="28px">
                Step 1: Create or join a room
              </Heading>
            </Box>
            <div></div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box width="450px" height="300px" backgroundColor="">
                <Text textAlign={"justify"} fontSize="18px">
                  One person will enter the room name, the passcode, and that
                  person's nickname. Then, click “Create or Join”.
                  <br />
                  <br />
                  Another person can join the room by entering the same room
                  name and the passcode, but they can choose a different
                  nickname for themselves. Finally, click “Create or Join”.
                  <br />
                  <br />
                  Once everyone left the room by closing the browser tab, the
                  messages will no longer be available even if the same room is
                  created again.
                </Text>
              </Box>
              <Box width="50px" height="300px" backgroundColor=""></Box>
              <Box width="550px" backgroundColor="green">
                <img src={"guide1.png"} alt="main page picture"></img>
              </Box>
            </Box>

            <div></div>
            <div></div>
            <Box
              bgColor={"#A5DDFF"}
              width={"600px"}
              borderRadius={"50px"}
              padding={2}
              textAlign={"center"}
            >
              <Heading size="lg" fontSize="28px">
                Step 2: Messaging
              </Heading>
            </Box>
            <div></div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box width="450px" height="300px" backgroundColor="">
                <Text textAlign={"justify"} fontSize="18px">
                  If all the required participants have join the room, the room
                  owner can prevent others from joining by clicking on the lock
                  icon at the bottom left corner.
                  <br />
                  <br />
                  To chat, type your message into the textbox and hit enter.
                  Your messages will be displayed at the right side. Click on
                  the upload icon to upload photos and the emoji icon to select
                  emojis.
                </Text>
              </Box>
              <Box width="50px" height="300px" backgroundColor=""></Box>
              <Box width="550px" backgroundColor="green">
                <img src={"/guide2.png"} alt="chat page picture"></img>
              </Box>
            </Box>
            <br />
            <br />
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Guide;
