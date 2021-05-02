import { Flex, Text } from "@chakra-ui/react"
import {useState} from "react"
import { useHistory } from "react-router-dom"

function NewSighting({currentUser}) {

    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        timestamp: "",
        description: "",
        user_id: null,
        dog_id: null
    })

    
    console.log(formData);
    
    
    
    
    return(
        <Flex justifyContent='center' marginTop='100px'>
            {currentUser ? setFormData(...formData, user_id => currentUser.id) : null }
            <h1>Sighting</h1>
        </Flex>
    )
}

export default NewSighting