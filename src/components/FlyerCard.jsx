import { Flex, Text, Box, Image, Button,Badge } from "@chakra-ui/react"


function FlyerCard({flyer}) {
//  console.log(flyer.attributes.dog.image);

    const dog = flyer.attributes.dog
    const pics = flyer.attributes.dog.image
    const stock = 'https://st2.depositphotos.com/thumbs/32032774/vector/46237/462377004/api_thumb_450.jpg'

    // console.log(pics);


    return(
        <Flex>
            <Box textAlign='center'>
                <Box>Name: {dog.name}</Box>
                <Box>Breed: {dog.breed}</Box>
                <Box>Temperament: {dog.temperament}</Box>
                <Badge borderRadius="full" px="2" colorScheme="red">
                    Reward
                </Badge>
                <Box> {pics[0] == null ? <Image src={stock}/> : <Image src={pics[0]}/> } </Box>
                <Button colorScheme='red' margin='1'>Update</Button>
            </Box>
        </Flex>
    )
}

export default FlyerCard