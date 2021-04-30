import logo from './HomewardHound.png'
import { Flex, Box, Image, Button, Center } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"


function NavBar({setCurrentUser, setWarning}) {

    const history = useHistory()

    const handleLogout = () => {
        localStorage.clear()
        setCurrentUser(null)
        setWarning(false)
        history.push("/")
    }

    return(
        <Flex borderWidth='medium' borderRadius='sm'  w='100%' bg='red' h='100%' >
            <Center w='100%' margin='3' alignContent='center'> 
                <Button onClick={() => history.push("/flyers")} colorScheme="teal" variant="outline">
                    Missing Flyers
                </Button>
            </Center>
            <Center w='100%' >
                {/* <AspectRatio > */}
                <Image borderRadius="full" boxSize='150px' src={logo} fit='contain'/>
                {/* </AspectRatio> */}
            </Center>
            <Center w='100%' margin='3' justifyContent='center'> 
                <Button onClick={handleLogout} colorScheme="teal" variant="outline">
                    Logout
                </Button>
            </Center>
        </Flex>
    )
}

export default NavBar