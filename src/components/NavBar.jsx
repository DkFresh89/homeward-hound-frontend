import logo from './HomewardHound.png'
import { Flex, Box, Image } from "@chakra-ui/react"


function NavBar() {

    return(
        <Flex justifyContent='center' w='100%' bg='red' h='56px'>
            <Box >
                {/* <AspectRatio ratio={16 / 9}> */}
                <Image src={logo} fit='contain'/>
                {/* </AspectRatio> */}
            </Box>
        </Flex>
    )
}

export default NavBar