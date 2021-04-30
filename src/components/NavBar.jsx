import logo from './HomewardHound.png'
import { Flex, Box, Image, Button } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"


function NavBar() {

    const history = useHistory()

    return(
        <Flex justifyContent='center' w='100%' bg='red' h='56px'>
            <Box justifyContent='left'> 
                <Button onClick={() => history.push("/flyers")} colorScheme="teal" variant="outline">
                    Missing Flyers
                </Button>
            </Box>
            <Box >
                {/* <AspectRatio ratio={16 / 9}> */}
                <Image src={logo} fit='contain'/>
                {/* </AspectRatio> */}
            </Box>
        </Flex>
    )
}

export default NavBar