import { Button } from "@chakra-ui/button";
import { Flex, Box, Stack } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom"
import SightingCard from './SightingCard'


function SightingContainer({sightings, setSightings, currentUser}){

    const history = useHistory()

    console.log(sightings);

    const sightingsArray = sightings.map(sighting => {
        console.log(sighting);
        return(
        <Box margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center'>
        <SightingCard currentUser={currentUser} sighting={sighting} />
        </Box>
        )
    })

    console.log(sightingsArray);

    return(
        <Flex justifyContent='center' marginTop='100px'>
            <Stack>
            <Flex justifyContent='content'> <Button onClick={() => history.push('/new_sighting')}>New Sighting</Button></Flex>
            
            <Flex>{sightingsArray}</Flex>
            </Stack>
        </Flex>
    )
}

export default SightingContainer