import logo from './HomewardHound.png'
import { Flex, Box, Image, Button, Center, ButtonGroup, useColorMode } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { GiSittingDog, GiBinoculars, GiPin, GiSun, GiMoon } from "react-icons/gi";
import { IoLogOutOutline, IoLogInOutline, IoMoon, IoAddCircleOutline } from "react-icons/io5";


function NavBar({setCurrentUser, setWarning, currentUser}) {

    const history = useHistory()
    const { colorMode, toggleColorMode } = useColorMode()

    const handleLogout = () => {
        localStorage.clear()
        setCurrentUser(null)
        setWarning(false)
        history.push("/")
    }

    const handleLogin = () => {
        history.push('/login')
    }

    return (
        <Flex borderWidth="medium" borderRadius="sm" w="100%" bg="red" h="150" position='fixed' top='0' zIndex='overlay'>
        <Center w="100%" margin="3" alignContent="center">
            <ButtonGroup>
            <Button fontFamily='Playfair Display' leftIcon={<GiPin/>} 
                onClick={() => history.push("/flyers")}
                colorScheme="blackAlpha"
                variant="solid"
            >
                Missing Flyers
            </Button>
            <Button fontFamily='Fjalla One' leftIcon={<GiBinoculars/>} 
                onClick={() => history.push("/sighting")}
                colorScheme="blackAlpha"
                variant="solid"
            >
                Sighting
            </Button>
            {currentUser ?  <Button fontFamily='Fjalla One' leftIcon={<GiSittingDog/>} 
                onClick={() => history.push("/dogs")}
                colorScheme="blackAlpha"
                variant="solid"
            > 
                Your Dogs
            </Button> : null }
            </ButtonGroup>
        </Center>
        <Center w="100%">
            {/* <AspectRatio > */}
            <Image onClick={() => history.push('/')} borderRadius="full"  src={logo} fit="contain" />
            {/* </AspectRatio> */}
        </Center>
        <Center w="100%" margin="3" justifyContent="center">
            {currentUser ? (
            <ButtonGroup>
                {" "}
                <Button onClick={handleLogout} colorScheme="red" variant="solid" rightIcon={<IoLogOutOutline/>}>
                Logout
                </Button>{" "}
                {colorMode === "light" ? 
                <Button colorScheme='blackAlpha' onClick={toggleColorMode}
                rightIcon={<IoMoon/>}
                >
                    Dark Mode
                </Button> :
                <Button  colorScheme='blackAlpha' onClick={toggleColorMode}
                rightIcon={<GiSun/>}
                >
                    Light Mode
                </Button>}
            </ButtonGroup>
            ) : (
            <ButtonGroup>
                {" "}
                <Button
                onClick={() => history.push("/signup")}
                colorScheme="purple"
                variant="solid"
                rightIcon={<IoAddCircleOutline/>}
                >
                Signup
                </Button>{" "}
                <Button
                onClick={handleLogin}
                colorScheme="blue"
                variant="solid"
                rightIcon={<IoLogInOutline/>}
                >
                Login
                </Button>
                {colorMode === "light" ? 
                <Button colorScheme='blackAlpha' onClick={toggleColorMode}
                rightIcon={<IoMoon/>}
                >
                    Dark Mode
                </Button> :
                <Button colorScheme='blackAlpha' onClick={toggleColorMode}
                rightIcon={<GiSun/>}
                >
                    Light Mode
                </Button>}
            </ButtonGroup>
            )}
        </Center>
        </Flex>
    );
}

export default NavBar