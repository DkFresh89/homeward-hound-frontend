import { Flex, Input, Text, Textarea, Stack, RadioGroup, Radio, FormLabel, Button } from "@chakra-ui/react"
import { useState, useEffect } from 'react'

function EditFlyer({editFormData, setEditFormData}) {

    // console.log(editFormData);

    // const [formData, setFormData] = useState({
    //     latitude: "",
    //     longitude: "",
    //     description: "",
    //     reward: false,
    //     found: false,
    //     dog_id: null
    // })

    const handleChange = (e) => {
        console.log(e.target.name);
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value})
    }
    const handleReward = (e) => {
        setEditFormData({...editFormData, reward: e})
    }
    const handleFound = (e) => {
        setEditFormData({...editFormData, found: e})
    }

    const dog = editFormData.dog
    console.log(editFormData);

    return (
        <Flex justifyContent='center' textAlign='center' marginTop='100px'>
            <Stack>
                <Text>Name: {dog.name}</Text>
            <form>
                <Textarea
                    name='description'
                    onChange={handleChange}
                    placeholder={editFormData.description}
                    size="md"
                />
                <RadioGroup onChange={handleReward} >
                <FormLabel>Reward Offered?</FormLabel>
                <Stack direction="row">
                    <Radio value={`${true}`}>Yes</Radio>
                    <Radio value={`${false}`}>No</Radio>
                </Stack>
                </RadioGroup>
                <RadioGroup onChange={handleFound} >
                <FormLabel>Has the dog been found?</FormLabel>
                <Stack direction="row">
                    <Radio value={`${true}`}>Yes</Radio>
                    <Radio value={`${false}`}>No</Radio>
                </Stack>
                </RadioGroup>
                <Button type="submit" colorScheme="blue">
                Submit
            </Button>
            </form>
            </Stack>
        </Flex>
    )
}

export default EditFlyer