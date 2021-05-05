import { Box, Flex, Text, Divider, Badge } from "@chakra-ui/react";


function SightingCard({sighting,currentUser}) {

    console.log(sighting);

    let dog = null

    sighting.attributes.dog != null ? dog=sighting.attributes.dog : dog=null

    console.log(dog);

    return (
        <Flex >
            <Box w='300px' h='100%'>
                { dog != null ?<Flex padding='1' justifyContent='center'> <Badge
                    colorScheme='yellow'
                    variant='solid'
                >Attached to flyer for:  {dog.name}</Badge></Flex> 
                : null }


            <Box padding='1'>Sighting ID: {sighting.id}</Box>
            <Divider />
            {sighting.attributes.user != null &&<> <Box padding='1'>Owner: {sighting.attributes.user["name"]}</Box><Divider /> </>}
            {sighting.attributes.missing_flyer != null &&<> <Box padding='1'>Flyer information: {sighting.attributes.missing_flyer["description"]}</Box><Divider /> </>}
            
            <Box padding='1'>Description: {sighting.attributes.description}</Box>
            {/* <Divider /> */}
            {/* {sighting.attributes.user === null & sighting.attributes.missing_flyer === null ? <Text>asdf</Text> : null} */}
            {dog != null && 
                <Box >
                <Divider/>
                <Text>Dog Info:</Text>
                <Box padding='1'>Name: {dog.name}</Box>
                <Box padding='1'>Breed: {dog.breed}</Box>
                <Box padding='1'>Temperament: {dog.temperament}</Box>
                </Box>
            }
            </Box>
        </Flex>
    )
}

export default SightingCard