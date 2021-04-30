import { Flex, Text, Box, Image } from "@chakra-ui/react"

function FlyerCard({flyer}) {
 console.log(flyer.attributes.dog.image);

    const pics = flyer.attributes.dog.image

    console.log(pics);

    const dog = flyer.attributes.dog

    return(
        <Flex>
            <Box>{dog.name}</Box>
            <Box>{dog.breed}</Box>
            <Box>{dog.temperament}</Box>
            <Box>
                <Image src={pics[0]} alt="Shit"/>
            </Box>
        </Flex>
    )
}

export default FlyerCard