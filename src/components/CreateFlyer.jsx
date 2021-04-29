import { Flex } from "@chakra-ui/react"
import {useState} from "react"

function CreateFlyer() {

    const history = useHistory()
    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        description: "",
        reward: null,
        found: false,
        dog_id: 1
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleRadio = (e) => {
        setFormData({...formData, good_sam: e})
    }

    const handleCreateFlyer = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(data => {
            history.push("/flyers") 
        })
    }

    return(
        <Flex>
            <form onSubmit={handleCreateFlyer}>
                
            </form>
        </Flex>
    )
}

export default CreateFlyer