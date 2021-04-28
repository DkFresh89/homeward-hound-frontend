import { Flex, Input, Button, InputGroup, InputLeftElement, RadioGroup, Stack, FormLabel, InputRightElement, Box} from "@chakra-ui/react"
import { Radio } from "@chakra-ui/radio"
import { PhoneIcon} from '@chakra-ui/icons'
import {useState} from "react"

function Signup() {
    
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone_number: "",
        good_sam: null,
        password_digest: ""
    })

    const handleClick = () => setShow(!show)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleRadio = (e) => {
        setFormData({...formData, good_sam: e})
    }

    const handleSignup = (e) => {

        console.log(formData);
        e.preventDefault()

        // fetch("http://localhost:3000/signup", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'Application/json',
        //         'Accept': 'Application/json'
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data);
        // })
    }

    // console.log(formData);

    return(

        <Flex >
            <form onSubmit={handleSignup}>
            <Stack >
            <Input onChange={handleChange} type='text' name='name' placeholder="Name"></Input>
            <Input onChange={handleChange} type='text' name='address' placeholder="Address"></Input>

            <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
                />
                <Input onChange={handleChange} type='text' name='phone_number' type="tel" placeholder="Phone number" />
            </InputGroup>

            <Box textAlign='center'>
            <RadioGroup onChange={handleRadio}  >
                <FormLabel >Are you a dog owner?</FormLabel>
                <Stack direction="row">
                    <Radio value="true">Yes</Radio>
                    <Radio value="false">No</Radio>
                </Stack>
            </RadioGroup>
            </Box>

            <InputGroup size="md">
                <Input onChange={handleChange} type='text' name='password_digest' pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password"/>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}> {show ? "Hide" : "Show"} </Button>
                </InputRightElement>
            </InputGroup>

            <Button  type="submit" colorScheme="blue">Submit</Button>

            </Stack>
            </form>
            
        </Flex>

    )
}


export default Signup