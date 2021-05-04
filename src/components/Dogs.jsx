import { Flex, Button, Stack, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom"
import DogCard from './DogCard'


function Dogs({currentUser}) {

    const history = useHistory()

    console.log(currentUser.dogs);

    const dog = currentUser.dogs.map (dog => {
        return(
            <Box margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center'> 
            <DogCard key={dog.name} dog={dog} />
            </Box>
        )
    })

    return(

        <Flex justifyContent='center' marginTop='100'>
            <Stack >
            <Flex justifyContent='center'><Button onClick={() => history.push('/add_dog')}>Add Dog</Button></Flex>
            <Flex >{dog}</Flex>
            </Stack>
        </Flex>

    )
}


export default Dogs