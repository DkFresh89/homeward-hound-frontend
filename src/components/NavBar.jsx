import logo from './HomewardHound.png'
import { Flex, Box, Image, Button, Center, ButtonGroup } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"


function NavBar({setCurrentUser, setWarning, currentUser}) {

    const history = useHistory()

    const handleLogout = () => {
        localStorage.clear()
        setCurrentUser(null)
        setWarning(false)
        history.push("/")
    }

    const handleLogin = () => {
        history.push('/login')
    }

    return(
        <Flex borderWidth='medium' borderRadius='sm'  w='100%' bg='red' h='100%' >
            <Center w='100%' margin='3' alignContent='center'> 
                <ButtonGroup>
                    <Button onClick={() => history.push("/flyers")} colorScheme="blackAlpha" variant="outline">
                        Missing Flyers
                    </Button>
                    <Button onClick={() => history.push("/sighting")} colorScheme="blackAlpha" variant="outline">
                        Sighting
                    </Button>
                </ButtonGroup>
            </Center>
            <Center w='100%' >
                {/* <AspectRatio > */}
                <Image borderRadius="full" boxSize='150px' src={logo} fit='contain'/>
                {/* </AspectRatio> */}
            </Center>
            <Center w='100%' margin='3' justifyContent='center'> 
                {currentUser ? <Button onClick={handleLogout} colorScheme="red" variant="solid">
                    Logout
                </Button> : <ButtonGroup> <Button onClick={() => history.push('/signup')} colorScheme="whiteAlpha" variant="outline">
                    Signup
                </Button> <Button onClick={handleLogin} colorScheme="blackAlpha" variant="outline">
                    Login
                </Button>
                

                 </ButtonGroup>} 
            </Center>
        </Flex>
    )
}

export default NavBar