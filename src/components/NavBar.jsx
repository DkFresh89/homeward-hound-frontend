import logo from './HomewardHound.png'
import { Flex, Box, Image, Button, Center, ButtonGroup, useColorMode } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"


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
        <Flex borderWidth="medium" borderRadius="sm" w="100%" bg="red" h="100%">
        <Center w="100%" margin="3" alignContent="center">
            <ButtonGroup>
            <Button
                onClick={() => history.push("/flyers")}
                colorScheme="blackAlpha"
                variant="outline"
            >
                Missing Flyers
            </Button>
            <Button
                onClick={() => history.push("/sighting")}
                colorScheme="blackAlpha"
                variant="outline"
            >
                Sighting
            </Button>
            {currentUser ?  <Button
                onClick={() => history.push("/dogs")}
                colorScheme="blackAlpha"
                variant="outline"
            >
                Your Dogs
            </Button> : null }
            </ButtonGroup>
        </Center>
        <Center w="100%">
            {/* <AspectRatio > */}
            <Image borderRadius="full" boxSize="150px" src={logo} fit="contain" />
            {/* </AspectRatio> */}
        </Center>
        <Center w="100%" margin="3" justifyContent="center">
            {currentUser ? (
            <ButtonGroup>
                {" "}
                <Button onClick={handleLogout} colorScheme="red" variant="solid">
                Logout
                </Button>{" "}
                <Button onClick={toggleColorMode}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>{" "}
            </ButtonGroup>
            ) : (
            <ButtonGroup>
                {" "}
                <Button
                onClick={() => history.push("/signup")}
                colorScheme="whiteAlpha"
                variant="outline"
                >
                Signup
                </Button>{" "}
                <Button
                onClick={handleLogin}
                colorScheme="blackAlpha"
                variant="outline"
                >
                Login
                </Button>
                <Button onClick={toggleColorMode}>
                Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
            </ButtonGroup>
            )}
        </Center>
        </Flex>
    );
}

export default NavBar