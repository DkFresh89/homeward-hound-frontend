import { Flex, Text, Textarea, Input, Box, Button } from "@chakra-ui/react"
import {useState, useEffect} from "react"
import { useHistory } from "react-router-dom"

function NewSighting({currentUser}) {

    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        description: "",
        user_id: null,
        missing_flyer_id: null
    })

    
    // {currentUser ? console.log(currentUser.id) : null}
    useEffect(() => {
        if (currentUser){
            console.log(currentUser);
            setFormData({...formData, user_id: currentUser.id})
        }
    }, [])

    console.log(formData);
    
    const handleChange = (e) => {
        // console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleCreateSighting = (e) => {
        e.preventDefault()
        // getLocation()
        console.log(formData);
        fetch("http://localhost:3000/create_sighting", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            // updateFlyers(data.data)
            // history.push("/flyers") 
        })
    }
    
    
    return(
        <Flex justifyContent='center' marginTop='100px' textAlign='center'>
            <form onClick={handleCreateSighting}>
            <Box >
            <Text margin='2'>Sighting</Text>
            <Textarea 
                name='description'
                onChange={handleChange}
                placeholder="Description"
                size="lg"
            />
            </Box>
            <Flex justifyContent='center'><Button type="submit" colorScheme="blue">
                Submit
            </Button></Flex>
            </form>
        </Flex>
    )
}

export default NewSighting