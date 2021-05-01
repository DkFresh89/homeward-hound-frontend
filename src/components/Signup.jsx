import { Flex, Input, Button, InputGroup, InputLeftElement, RadioGroup, Stack, FormLabel, InputRightElement, Box, Text} from "@chakra-ui/react"
import { Radio } from "@chakra-ui/radio"
import { PhoneIcon} from '@chakra-ui/icons'
import {useState} from "react"
import { useHistory } from "react-router-dom"

function Signup({setCurrentUser}) {
    
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone_number: "",
        good_sam: "",
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

        console.log(formData.good_sam);
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
            // console.log(typeof data.good_sam);
            setCurrentUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
            data.good_sam === "true" ? history.push("/flyers") : history.push("/add_dog") 
        })
    }

    // console.log(formData);

    return (
        <Flex justifyContent='center' marginTop='100px'>
        <form onSubmit={handleSignup}>
            <Stack textAlign='center'>
            <Text>Signup</Text>
            <Input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Name"
            ></Input>
            <Input
                onChange={handleChange}
                type="text"
                name="address"
                placeholder="Address"
            ></Input>

            <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
                />
                <Input
                onChange={handleChange}
                // type="text"
                name="phone_number"
                type="tel"
                placeholder="Phone number"
                />
            </InputGroup>

            <Box textAlign="center">
                <RadioGroup onChange={handleRadio} name="good_sam">
                <FormLabel>Are you a dog owner?</FormLabel>
                <Stack direction="row">
                    <Radio value={`${false}`}>Yes</Radio>
                    <Radio value={`${true}`}>No</Radio>
                </Stack>
                </RadioGroup>
            </Box>

            <InputGroup size="md">
                <Input
                onChange={handleChange}
                // type="text"
                name="password_digest"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                <Button variant='solid' h="1.75rem" size="sm" onClick={handleClick}>
                    {" "}
                    {show ? "Hide" : "Show"}{" "}
                </Button>
                </InputRightElement>
            </InputGroup>

            <Button type="submit" colorScheme="blue">
                Submit
            </Button>
            </Stack>
        </form>
        </Flex>
    );
}


export default Signup