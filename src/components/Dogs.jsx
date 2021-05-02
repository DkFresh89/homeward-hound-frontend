import { Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom"


function Dogs({currentUser}) {

    const history = useHistory()

    console.log(currentUser.dogs);

    const dog = currentUser.dogs.map (dog => {
        return(
            dog.name
        )
    })

    return(

        <Flex>
            <Button onClick={() => history.push('/add_dog')}>Add Dog</Button>
            {dog}
        </Flex>

    )
}


export default Dogs