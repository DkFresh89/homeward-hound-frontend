import { Flex, Box } from "@chakra-ui/react"
import FlyerCard from './FlyerCard'


function FlyersContainer({flyers}) {

    // console.log(flyers);

    const flyerCards = flyers.map(flyer => {
        // console.log(flyer);
    return ( 
        <Box borderWidth="1px" borderRadius="lg" justifyContent='center'>
            <FlyerCard key={flyer.id} flyer={flyer} />
        </Box> 
    )
    })

    // console.log(flyerCards);

    return(
        <Flex justifyContent='center'>
            
            <Box>{flyerCards}</Box>
            
        </Flex>
    )
}

export default FlyersContainer