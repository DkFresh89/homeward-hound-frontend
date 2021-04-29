import { Flex } from "@chakra-ui/react"
import {useState} from "react"
import { useHistory } from "react-router-dom"

function Sighting() {

    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        size: "",
        age: null,
        temperament: "",
        user_id: 1
    })


    return(
        <Flex>

        </Flex>
    )
}

export default Sighting