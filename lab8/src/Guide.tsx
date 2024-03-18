import main_page_picture from '/images/guide1.png'
import chat_page_picture from '/images/guide2.png'
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

function Guide() {
  return (
    <Box bgColor={"#ebebeb"} w={"100%"} h={"100%"} pt={4}>
      <Container maxW={"1000px"} h={"100%"}>
        <Flex justify={"flex-end"}>
          <HStack gap={8}>
            <Link textDecor={"underline"}>About</Link>
            <Link textDecor={"underline"}>Contact Us</Link>
            <Link textDecor={"underline"}>How To Use</Link>
          </HStack>
        </Flex>

        <Flex pt={8} h={"100%"} align={"start"}>
          <VStack flex={1} justify={"center"} gap={4}>
            <Heading as={"h1"} size={"3xl"} color={"#f054b0"}>
              INSTACHAT
            </Heading>
            <Heading as={"h2"} size={"2xl"} color={"#737373"}>
              A quick guide
            </Heading>
            <div>
                <br/>
            </div>
            <Button
              bgColor={"#A5DDFF"}
              size={"lg"}
              width={"600px"}
              borderRadius={"50px"}
            >
            <Heading size="lg" fontSize="28px">
                Step 1: Create or join a room
            </Heading>
            </Button>
            <div></div>
            <Box display="flex" justifyContent="center" alignItems="center" >
              <Box width="450px" height="300px" backgroundColor="">
                <Text textAlign={"justify"} fontSize="18px">
                  One person will enter the room name, the passcode, and that person’s nickname. Then, click “Create or Join”.
                  <br/><br/>
                  Another person can join the room by entering the same room name and the passcode, but they can choose a different nickname for themselves. Finally, click “Create or Join”.
                  <br/><br/>
                Once everyone left the room by closing the browser tab, the messages will no longer be available even if the same room is created again.
                </Text>
              </Box>
              <Box width="50px" height="300px" backgroundColor=""></Box>
              <Box width="550px" backgroundColor="green">
                <img src={main_page_picture} alt="main page picture"></img>
              </Box>
            </Box>

            <div></div>
            <div></div>
            <Button
              bgColor={"#A5DDFF"}
              size={"lg"}
              width={"600px"}
              borderRadius={"50px"}
            >
            <Heading size="lg" fontSize="28px">
            Step 2: Messaging
            </Heading>
            </Button>
            <div></div>
            <Box display="flex" justifyContent="center" alignItems="center" >
              <Box width="450px" height="300px" backgroundColor="">
                <Text textAlign={"justify"} fontSize="18px">
                If all the required participants have join the room, the room owner can prevent others from joining by clicking on the lock icon at the bottom left corner. 
                <br/><br/>
                To chat, type your message into the textbox and hit enter. Your messages will be displayed at the right side. Click on the upload icon to upload photos and the emoji icon to select emojis.
                </Text>
              </Box>
              <Box width="50px" height="300px" backgroundColor=""></Box>
              <Box width="550px" backgroundColor="green">
                <img src={chat_page_picture} alt="chat page picture"></img>
              </Box>
            </Box>
            <br/><br/>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Guide;
