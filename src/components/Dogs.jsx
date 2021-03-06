import { Flex, Button, Stack, Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { useHistory } from "react-router-dom"
import DogCard from './DogCard'
import {useState} from 'react'


function Dogs({userDogs, setUserDogs}) {

    const history = useHistory()
    const [filterDogs, setFilterDogs] = useState({})


    const handleConfirm = (e) => {
        console.log(e.target.name);

    

    fetch(`http://localhost:3000/dogs/${e.target.name}`, {
        method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(data => {
        const filteredDogs = userDogs.filter((dog) => ( dog.id != data.id))
        // console.log(filteredDogs)
        setUserDogs(filteredDogs)
        // setUserDogs([...userDogs, data])
    //  history.push('/dogs')
    })



    }

    // const mappedDogs = filterDogs ? setUserDogs([...userDogs, filterDogs]) : userDogs

    // console.log(mappedDogs);
    // console.log(currentUser);

    const dog = userDogs.map (dog => {
        return(
            <WrapItem  boxShadow="dark-lg" margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center'> 
            <DogCard key={dog.name} dog={dog} userDogs={userDogs} handleConfirm={handleConfirm} />
            </WrapItem>
        )
    })

    return(

        <Flex justifyContent='center' marginTop='100'>
            <Stack >
            <Heading textAlign='center'  size='4xl' fontFamily='Fjalla One'>
                        Your Dogs
                    </Heading>
            <Flex  justifyContent='center'><Button letterSpacing='1px' fontFamily='Fjalla One' fontWeight='light' colorScheme='green' boxShadow="dark-lg" onClick={() => history.push('/add_dog')}>Add Dog</Button></Flex>
            <Wrap justify='center' spacing='30px' >{dog}</Wrap>
            </Stack>
        </Flex>

    )
}


export default Dogs