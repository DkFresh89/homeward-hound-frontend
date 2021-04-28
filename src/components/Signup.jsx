import { Flex, Input, Button, InputGroup, InputLeftElement, Radio, RadioGroup, Stack, FormLabel, InputRightElement } from "@chakra-ui/react"
import { PhoneIcon} from '@chakra-ui/icons'
import {useState} from "react"

function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone_number: "",
        good_sam: null,
        password_digest: ""
      })

      const [show, setShow] = useState(false)
      const handleClick = () => setShow(!show)

    const dogOwnerCheck = () => {

    }

    return(

        <Flex>
            <Stack >
            <Input placeholder="Name"></Input>
            <Input placeholder="Address"></Input>

            <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Phone number" />
            </InputGroup>

            <RadioGroup onChange={dogOwnerCheck}>
                <FormLabel>Are you a dog owner?</FormLabel>
                <Stack direction="row">
                    <Radio value="true">Yes</Radio>
                    <Radio value="false">No</Radio>
                </Stack>
            </RadioGroup>

            <InputGroup size="md">
                <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password"/>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}> {show ? "Hide" : "Show"} </Button>
                </InputRightElement>
            </InputGroup>

            <Button type="submit" colorScheme="blue">Submit</Button>

            </Stack>
        </Flex>

    )
}


export default Signup