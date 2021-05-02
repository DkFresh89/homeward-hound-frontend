import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom"


function Sighting(){

    const history = useHistory()

    return(
        <Flex justifyContent='center' marginTop='100px'>
            <Button onClick={() => history.push('/new_sighting')}>New Sighting</Button>
        </Flex>
    )
}

export default Sighting