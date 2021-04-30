import { Flex, Text, Box, Image } from "@chakra-ui/react"


function FlyerCard({flyer}) {
//  console.log(flyer.attributes.dog.image);

    const dog = flyer.attributes.dog
    const pics = flyer.attributes.dog.image
    const stock = 'https://st2.depositphotos.com/thumbs/32032774/vector/46237/462377004/api_thumb_450.jpg'

    // console.log(pics);


    return(
        <Flex>
            <Box textAlign='center'>
                <Box>{dog.name}</Box>
                <Box>{dog.breed}</Box>
                <Box>{dog.temperament}</Box>
                <Box> {pics[0] == null ? <Image src={stock}/> : <Image src={pics[0]}/> } </Box>
            </Box>
        </Flex>
    )
}

export default FlyerCard