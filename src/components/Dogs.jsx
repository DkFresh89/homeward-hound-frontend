import { Flex } from "@chakra-ui/layout";


function Dogs({currentUser}) {

    console.log(currentUser.dogs);

    const dog = currentUser.dogs.map (dog => {
        return(
            dog.name
        )
    })

    return(

        <Flex>
            {dog}
        </Flex>

    )
}


export default Dogs