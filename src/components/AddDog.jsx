import { Flex, Stack } from "@chakra-ui/layout";
import {useState} from "react"
import { Button, Input } from '@chakra-ui/react'


function AddDog() {

    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        size: "",
        age: null,
        temperament: "",
        user_id: 1
    })

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
        <Flex>
            <form>
            <Stack>
                <Input placeholder='Name' name='name'  onChange={handleChange}/>
                <Input placeholder='Breed' name='breed'  onChange={handleChange}/>
                <Input placeholder='Size' name='size'  onChange={handleChange}/>
                <Input type='number' placeholder='Age' name='age'  onChange={handleChange}/>
                <Input placeholder='Temperament' name='temperament'  onChange={handleChange}/>
                <Button onClick={handleDog} type="submit" colorScheme="blue">Add Pooch</Button>
            </Stack>
            </form>
        </Flex>
    )
}

export default AddDog