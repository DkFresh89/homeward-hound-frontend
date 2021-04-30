import { Flex, Box } from "@chakra-ui/react"
import FlyerCard from './FlyerCard'


function FlyersContainer({flyers}) {

    // console.log(flyers);

    const flyerCards = flyers.map(flyer => {
        // console.log(flyer);
       return ( <FlyerCard key={flyer.id} flyer={flyer} />)
    })

    // console.log(flyerCards);

    return(
        <Flex>
            <Box>{flyerCards}</Box>
        </Flex>
    )
}

export default FlyersContainer