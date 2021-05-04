import {
    Box,
    chakra,
    Container,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Image,
    Flex
} from '@chakra-ui/react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ReactNode } from 'react';
import logo from './HomewardHound.png'


function Footer() {


        
        const Logo = (props: any) => {
        return (
            <Image boxSize='100' src={logo}/>
        );
        };
        
        const SocialButton = ({
            children,
            label,
            href,
        }: {
            children: ReactNode;
            label: string;
            href: string;
        }) => {
            return (
            <chakra.button
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                rounded={'full'}
                w={8}
                h={8}
                cursor={'pointer'}
                as={'a'}
                href={href}
                display={'inline-flex'}
                alignItems={'center'}
                justifyContent={'center'}
                transition={'background 0.3s ease'}
                _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
                }}>
                <VisuallyHidden>{label}</VisuallyHidden>
                {children}
            </chakra.button>
            );
        };
        
        
            return (
            <Flex
                bg='red'
                color={useColorModeValue('gray.700', 'gray.200')}
                bottom='0'
                position='fixed'
                w='100%'
                >
                <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Logo />
                <Text>© 2021 DK Designs - All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Github'} href={'https://github.com/dkfresh89'}>
                    <FaGithub />
                    </SocialButton>
                    <SocialButton label={'Linkedin'} href={'www.linkedin.com/in/doug-kerzner'}>
                    <FaLinkedin />
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'https://www.instagram.com/dogsofinstagram/?hl=en'} isExternal>
                    <FaInstagram />
                    </SocialButton>
                </Stack>
                </Container>
            </Flex>
            );
        }
    



export default Footer