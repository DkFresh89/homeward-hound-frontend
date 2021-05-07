import { Flex, Button, Stack, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom"
import DogCard from './DogCard'
import {useState} from 'react'


function Dogs({currentUser, userDogs, setUserDogs}) {

    const history = useHistory()
    const [filterDogs, setFilterDogs] = useState({})


    const handleConfirm = (e) => {
        console.log(e.target.name);

    

    fetch(`http://localhost:3000/dogs/${e.target.name}`, {
        method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(data => {
    console.log(data)
    const filteredDogs = userDogs.filter((dog) => ( dog.id != data.id))
    setUserDogs(filteredDogs);
        // setUserDogs([...userDogs, data])
    //  history.push('/dogs')
    })



    }

    // const mappedDogs = filterDogs ? setUserDogs([...userDogs, filterDogs]) : userDogs

    // console.log(mappedDogs);
    // console.log(currentUser);

    const dog = userDogs.map (dog => {
        return(
            <Box  boxShadow="dark-lg" margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center'> 
            <DogCard key={dog.name} dog={dog} userDogs={userDogs} handleConfirm={handleConfirm} />
            </Box>
        )
    })

    return(

        <Flex justifyContent='center' marginTop='100'>
            <Stack >
            <Flex  justifyContent='center'><Button boxShadow="dark-lg" onClick={() => history.push('/add_dog')}>Add Dog</Button></Flex>
            <Flex >{dog}</Flex>
            </Stack>
        </Flex>

    )
}


export default Dogs