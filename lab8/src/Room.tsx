import {
  Avatar,
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useBoolean,
  useOutsideClick,
  Heading,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

function Room() {
  const [messages, setMessages] = useState<
    {
      time: string;
      nickname: string;
      message: string;
      color: string;
      position: "left" | "right";
    }[]
  >([]);
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useBoolean(false);
  const [ws, setWs] = useState<WebSocket>();
  const emojiRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  useOutsideClick({
    ref: emojiRef,
    handler: setEmojiPicker.off,
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = function message(data) {
      try {
        const { nickname, roomname, message, time, isUser, color } = JSON.parse(
          data.data.toString()
        );

        if (roomname === params.roomname) {
          setMessages((messages) => [
            ...messages,
            {
              nickname: nickname,
              message,
              time,
              position: isUser ? "right" : "left",
              color,
            },
          ]);
        }
      } catch {}
    };

    setWs(ws);
  }, []);

  const objDiv = document.getElementById("your_div");
  if (objDiv) {
    requestAnimationFrame(() => {
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  return (
    <Box bgColor={"#ebebeb"} w={"100%"} h={"100%"} py={8}>
      <Container maxW={"1000px"} h={"100%"}>
        <RouterLink to={"/"}>
          <Heading
            as={"h1"}
            size={"3xl"}
            color={"#f054b0"}
            mb={4}
            mx={"auto"}
            textAlign={"center"}
          >
            INSTACHAT
          </Heading>
        </RouterLink>

        <Box
          w={"100%"}
          h={"80%"}
          bgColor={"white"}
          borderRadius={"14px"}
          p={8}
          overflow={"scroll"}
          id={"your_div"}
        >
          {messages.map(({ nickname, time, message, color, position }, i) => (
            <Message
              key={i}
              nickname={nickname}
              time={time}
              message={message}
              color={color}
              position={position}
            />
          ))}
        </Box>

        <InputGroup
          mt={4}
          borderColor={"black"}
          bgColor={"white"}
          borderRadius={"14px"}
        >
          <InputLeftElement _hover={{ cursor: "pointer" }}>
            <PhoneIcon color={"green.400"} />
          </InputLeftElement>
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && message && ws) {
                setMessage("");
                ws.send(
                  JSON.stringify({
                    roomname: params.roomname,
                    message,
                  })
                );
              }
            }}
          ></Input>
          <InputRightElement _hover={{ cursor: "pointer" }} ref={emojiRef}>
            <Text onClick={setEmojiPicker.toggle}>🤣</Text>

            <Box position={"relative"}>
              <EmojiPicker
                open={emojiPicker}
                style={{ position: "absolute", top: "-500px", left: "-350px" }}
                onEmojiClick={({ emoji }) => setMessage(message + emoji)}
                emojiStyle={EmojiStyle.NATIVE}
              />
            </Box>
          </InputRightElement>
        </InputGroup>
      </Container>
    </Box>
  );
}

export default Room;

interface MessageProps {
  nickname: string;
  time: string;
  message: string;
  color: string;
  position: "left" | "right";
}

function Message({ nickname, time, message, color, position }: MessageProps) {
  return (
    <Flex gap={4} flexDir={position === "left" ? "row" : "row-reverse"}>
      <Stack gap={0.25} align={"center"}>
        <Text fontSize={"xs"} opacity={0}>
          a
        </Text>
        <Avatar bg={color} />
        <Text>{nickname}</Text>
      </Stack>

      <Stack gap={0.25} align={position === "left" ? "start" : "end"}>
        <Text fontSize={"xs"} fontWeight={"bold"}>
          {time}
        </Text>
        <Box
          minH={"48px"}
          p={4}
          color={"white"}
          bgColor={color}
          borderRadius={"24px"}
        >
          {message}
        </Box>
      </Stack>
    </Flex>
  );
}
