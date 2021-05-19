import { Flex, Input, Button, Stack, Text, InputGroup, InputRightElement } from "@chakra-ui/react"
import {useState} from "react"
import { useHistory } from "react-router-dom"

function Login({setCurrentUser, setUserDogs}) {

    const history = useHistory()
    const [show, setShow] = useState(false)

    const [loginData, setLoginData] = useState({
        name: "",
        password_digest: "",
    })

    const handleClick = () => setShow(!show)

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
      }

      const handleLogin = (e) => {
        e.preventDefault()
    
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                return resp.json().then((data) => {
                throw data;
                });
            }
        })
        .then(data => {
            setCurrentUser(data.data.attributes)
            setUserDogs(data.data.attributes.dogs)
            localStorage.setItem("user", JSON.stringify(data.data.attributes))
            history.push("/flyers")
        })
    }
    
    
    return (
        <Flex justifyContent='center' marginTop='200px' h='50em'>
            <form onSubmit={handleLogin}>
                <Stack textAlign='center'>
                <Text>Login</Text>
                <Input name='name' onChange={handleLoginChange} placeholder='Name' />
                <InputGroup size="md">
                        <Input
                        onChange={handleLoginChange}
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
                <Button onClick={handleLogin} type="submit" colorScheme="blue">Login</Button>
                </Stack>
            </form>
        </Flex>
    )
}



export default Login