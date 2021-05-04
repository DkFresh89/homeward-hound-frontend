import { Flex, Stack, Box } from "@chakra-ui/layout";
import {useState} from "react"
import { useHistory } from "react-router-dom"
import { Button, Input, ButtonGroup } from '@chakra-ui/react'
import stock from './missing.png'


function AddDog({currentUser}) {

    const history = useHistory()
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        size: "",
        age: null,
        temperament: "",
        image: 'https://images.assetsdelivery.com/compings_v2/newdesignillustrations/newdesignillustrations1902/newdesignillustrations190208953.jpg',
        user_id: currentUser.id
    })

    const handleSkip = () => {
        history.push("/flyers")
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData);
    }

    const handleDog = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/add_dog", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(data => {
         console.log(data)
        })
    }

    return(
        <Flex justifyContent='center' marginTop='100px'>
            <form>
            <Stack>
                <Input placeholder='Name' name='name'  onChange={handleChange}/>
                <Input placeholder='Breed' name='breed'  onChange={handleChange}/>
                <Input placeholder='Size' name='size'  onChange={handleChange}/>
                <Input type='number' placeholder='Age' name='age'  onChange={handleChange}/>
                <Input placeholder='Temperament' name='temperament'  onChange={handleChange}/>
                <ButtonGroup>
                    <Button onClick={handleSkip} colorScheme="gray">Skip</Button>
                    <Button onClick={handleDog} type="submit" colorScheme="green">Add Pooch</Button>
                </ButtonGroup>
            </Stack>
            </form>
        </Flex>
    )
}

export default AddDog