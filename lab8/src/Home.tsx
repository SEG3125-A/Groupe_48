import chatPic from '/images/chat.png'

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

function Home() {
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
              Create a Room
            </Heading>
            <Button
              bgColor={"white"}
              size={"lg"}
              width={"300px"}
              borderRadius={"24px"}
            >
              Room Name
            </Button>
            <Button
              bgColor={"white"}
              size={"lg"}
              width={"300px"}
              borderRadius={"24px"}
            >
              Passcode
            </Button>
            <Button
              bgColor={"white"}
              size={"lg"}
              width={"300px"}
              borderRadius={"24px"}
            >
              Nickname
            </Button>
            <Button bgColor={"#c1ff72"} size={"lg"} borderRadius={"24px"}>
              CREATE or JOIN
            </Button>
            <Text width={"300px"} textAlign={"center"}>
              By creating an account, you agree to our{" "}
              <Link textDecor={"underline"}>Terms of Service</Link>
            </Text>
          </VStack>

          <Box bgColor={"white"} width={"400px"} height={"400px"}>
            <img src={chatPic} alt="profile picture"></img>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Home;
