import { Flex, Box, Wrap, WrapItem } from "@chakra-ui/react"
import FlyerCard from './FlyerCard'


function FlyersContainer({flyers}) {

    // console.log(flyers);

    const handleUpdate = (e) => {
        console.log(e.target);
    }

    const flyerCards = flyers.map(flyer => {
        // console.log(flyer);
    return ( 
        <Box margin='10px' borderWidth="1px" borderRadius="lg" justifyContent='center'>
            <FlyerCard handleUpdate={handleUpdate} key={flyer.id} flyer={flyer} />
            
        </Box> 
    )
    })

    

    // console.log(flyerCards);

    return(
        <Wrap spacing='30px'  marginTop='100px'>
            
                <WrapItem >
                {flyerCards}
                </WrapItem>
            
        </Wrap>
    )
}

export default FlyersContainer