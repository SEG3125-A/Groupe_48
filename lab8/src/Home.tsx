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
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { roomname: "", passcode: "", nickname: "" } });
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Box bgColor={"#ebebeb"} w={"100%"} h={"100%"} pt={4}>
      <Container maxW={"1000px"} h={"100%"}>
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
            <Heading as={"h1"} size={"3xl"} color={"#f054b0"}>
              INSTACHAT
            </Heading>
            <Heading as={"h2"} size={"2xl"} color={"#737373"}>
              Create a Room
            </Heading>
            <Input
              bgColor={"white"}
              size={"lg"}
              width={"300px"}
              borderRadius={"24px"}
              placeholder="Room Name"
              {...register("roomname", {
                required: true,
              })}
            ></Input>
            <FormErrorMessage>
              {errors.roomname && errors.roomname.message}
            </FormErrorMessage>
            <Input
              bgColor={"white"}
              size={"lg"}
              width={"300px"}
              borderRadius={"24px"}
              placeholder="Passcode"
              {...register("passcode", {
                required: true,
              })}
            ></Input>
            <FormErrorMessage>
              {errors.passcode && errors.passcode.message}
            </FormErrorMessage>
            <Input
              bgColor={"white"}
              size={"lg"}
              width={"300px"}
              borderRadius={"24px"}
              placeholder="Nickname"
              {...register("nickname", {
                required: true,
              })}
            ></Input>
            <FormErrorMessage>
              {errors.nickname && errors.nickname.message}
            </FormErrorMessage>
            <Button
              bgColor={"#c1ff72"}
              size={"lg"}
              borderRadius={"24px"}
              onClick={handleSubmit((data) => {
                fetch("http://localhost:8080/join", {
                  body: JSON.stringify({
                    roomname: data.roomname,
                    passcode: data.passcode,
                    nickname: data.nickname,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "post",
                  credentials: "include",
                }).then((res) => {
                  if (res.ok) {
                    navigate(`/room/${data.roomname}`);
                  } else {
                    toast({
                      title: "Unauthorized",
                      description: "Incorrect passcode for roomname",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                });
              })}
            >
              CREATE or JOIN
            </Button>
            <Text width={"300px"} textAlign={"center"}>
              By creating an account, you agree to our{" "}
              <Link textDecor={"underline"}>Terms of Service</Link>
            </Text>
          </VStack>

          <Box bgColor={"white"} width={"400px"} height={"400px"}>
            <img src={"/chat.png"} alt="profile picture"></img>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Home;
