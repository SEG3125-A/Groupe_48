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
import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function Room() {
  const [messages, setMessages] = useState<
    { time: string; name: string; message: string; color: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useBoolean(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: emojiRef,
    handler: setEmojiPicker.off,
  });

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
        >
          {messages.map(({ name, time, message, color }, i) => (
            <Message
              key={i}
              name={name}
              time={time}
              message={message}
              color={color}
              position={"right"}
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
              if (event.key === "Enter" && message) {
                setMessages([
                  ...messages,
                  {
                    name: "Alex",
                    time: getCurrentTime(),
                    color: "blue.400",
                    message: message,
                  },
                ]);
                setMessage("");
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
  name: string;
  time: string;
  message: string;
  color: string;
  position: "left" | "right";
}

function Message({ name, time, message, color, position }: MessageProps) {
  return (
    <Flex gap={4} flexDir={position === "left" ? "row" : "row-reverse"}>
      <Stack gap={0.25} align={"center"}>
        <Text fontSize={"xs"} opacity={0}>
          a
        </Text>
        <Avatar bg={color} />
        <Text>{name}</Text>
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

function getCurrentTime() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  let meridiem = "am";

  if (hours >= 12) {
    meridiem = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  }

  if (hours === 0) {
    hours = 12;
  }

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + formattedMinutes + meridiem;
}
