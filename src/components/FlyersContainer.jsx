import { Flex, Box, Wrap, WrapItem, Button, Stack, Heading, Container } from "@chakra-ui/react"
import FlyerCard from './FlyerCard'
import { useHistory } from "react-router-dom"


function FlyersContainer({flyers, handleUpdate, currentUser, setFlyers}) {

    // console.log(flyers);
    const history = useHistory()

    

    const flyerCards = flyers.map(flyer => {
        // console.log(flyer);
    return ( 
        
        <WrapItem boxShadow="dark-lg" margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center'> 
            <FlyerCard currentUser={currentUser} flyers={flyers} setFlyers={setFlyers} handleUpdate={handleUpdate} key={flyer.id} flyer={flyer} />
            
        </WrapItem> 
    )
    })

    

    // console.log(flyerCards);

    return(
        <Flex direction='column'>
                <Box >
                    <Heading textAlign='center'  size='4xl' fontFamily='Fjalla One' padding='5'>
                        Missing Flyers
                    </Heading>
            {currentUser ? <Flex justifyContent='center'><Button margin='3' colorScheme='red' onClick={() => history.push("/new_flyer")}>Create New Flyer</Button></Flex> : null}
                </Box>

            <Wrap spacing='30px' justify='center' >
            {flyerCards}
            </Wrap>
        </Flex>
    )
}

export default FlyersContainer