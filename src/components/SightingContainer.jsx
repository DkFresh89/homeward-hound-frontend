import { Button } from "@chakra-ui/button";
import { Flex, Box, Stack, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { useHistory } from "react-router-dom"
import SightingCard from './SightingCard'


function SightingContainer({sightings, currentUser}){

    const history = useHistory()

    // console.log(sightings);

    const sightingsArray = sightings.map(sighting => {
        console.log(sighting);
        return(
        <WrapItem flexShrink='initial' boxShadow="dark-lg" margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center' >
        <SightingCard currentUser={currentUser} sighting={sighting} />
        </WrapItem>
        )
    })

    // console.log(sightingsArray);

    return(
        <Flex direction='column'>
            <Box padding='2' textAlign='center'>
                <Heading size='4xl' fontFamily='Fjalla One'>
                    Sightings
                </Heading>
            </Box>
            <Flex padding='2' justifyContent='center' > 
                <Button boxShadow="dark-lg"colorScheme='yellow' onClick={() => history.push('/new_sighting')}>
                    New Sighting
                </Button>
            </Flex>
            <Wrap  spacing='30px' justify='center'>
                {sightingsArray}
            </Wrap>
        </Flex>
    )
}

export default SightingContainer