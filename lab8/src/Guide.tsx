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
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Guide() {
  const { t } = useTranslation();

  return (
    <Box bgColor="#ebebeb" w="100%" pt={4}>
      <Container maxW="1000px">
        <Flex justify="flex-end">
          <HStack gap={8}>
            <Link textDecor="underline">{t('home.about')}</Link>
            <Link textDecor="underline">{t('home.contactUs')}</Link>
            <Link textDecor="underline" as={RouterLink} to="/guide">
              {t('home.howToUse')}
            </Link>
            <LanguageSwitcher />
          </HStack>
        </Flex>

        <Flex pt={8} align="start">
          <VStack flex={1} justify="center" gap={4}>
            <RouterLink to="/">
              <Heading as="h1" size="3xl" color="#f054b0">
                INSTACHAT
              </Heading>
            </RouterLink>
            <Heading as="h2" size="2xl" color="#737373">
              {t('guide.title')}
            </Heading>
            <div>
              <br />
            </div>
            <Box
              bgColor="#A5DDFF"
              width="600px"
              borderRadius="50px"
              padding={2}
              textAlign="center"
            >
              <Heading size="lg" fontSize="28px">
                {t('guide.section1')}
              </Heading>
            </Box>
            <div></div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box width="450px" height="300px" backgroundColor="">
                <Text textAlign="justify" fontSize="18px">
                  {t('guide.content1')}
                </Text>
                <br />
                <Text textAlign="justify" fontSize="18px">
                  {t('guide.content2')}
                </Text>
                <br />
                <Text textAlign="justify" fontSize="18px">
                  {t('guide.content3')}
                </Text>
              </Box>
              <Box width="50px" height="300px" backgroundColor=""></Box>
              <Box width="550px" backgroundColor="green">
                <img src={"guide1.png"} alt="main page picture" />
              </Box>
            </Box>

            <div></div>
            <div></div>
            <Box
              bgColor="#A5DDFF"
              width="600px"
              borderRadius="50px"
              padding={2}
              textAlign="center"
            >
              <Heading size="lg" fontSize="28px">
                {t('guide.section2')}
              </Heading>
            </Box>
            <div></div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box width="450px" height="300px" backgroundColor="">
                <Text textAlign="justify" fontSize="18px">
                  {t('guide.content1')}
                </Text>
                <br />
                <Text textAlign="justify" fontSize="18px">
                  {t('guide.content2')}
                </Text>
                <br />
                <Text textAlign="justify" fontSize="18px">
                  {t('guide.content3')}
                </Text>
              </Box>
              <Box width="50px" height="300px" backgroundColor=""></Box>
              <Box width="550px" backgroundColor="green">
                <img src={"/guide2.png"} alt="chat page picture" />
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
