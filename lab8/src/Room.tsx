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
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useRef, useState } from "react";

function Room() {
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
        <Box w={"100%"} h={"90%"} bgColor={"white"} borderRadius={"14px"} p={8}>
          <Message
            name={"alex"}
            time={"7:19pm"}
            message={"Yo whats up"}
            color={"green.400"}
            position={"left"}
          />

          <Message
            name={"danny"}
            time={"7:20pm"}
            message={"Nothing much"}
            color={"blue.400"}
            position={"right"}
          />
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
