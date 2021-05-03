import { Flex, Box, Wrap, WrapItem, Button, Stack } from "@chakra-ui/react"
import FlyerCard from './FlyerCard'
import { useHistory } from "react-router-dom"


function FlyersContainer({flyers, handleUpdate, currentUser, setFlyers}) {

    console.log(flyers);
    const history = useHistory()

    

    const flyerCards = flyers.map(flyer => {
        // console.log(flyer);
    return ( 
        
        <Box margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center'> 
            <FlyerCard currentUser={currentUser} flyers={flyers} setFlyers={setFlyers} handleUpdate={handleUpdate} key={flyer.id} flyer={flyer} />
            
        </Box> 
    )
    })

    

    // console.log(flyerCards);

    return(
        <Flex justifyContent='center' margin='10' padding='2'>
            <Stack>
            {currentUser ? <Flex justifyContent='center'><Button colorScheme='red' onClick={() => history.push("/new_flyer")}>Create New Flyer</Button></Flex> : null}
        <Wrap spacing='30px'  marginTop='100px'>
            
                <WrapItem >
                {flyerCards}
                </WrapItem>
        </Wrap>
                </Stack>
        </Flex>
    )
}

export default FlyersContainer