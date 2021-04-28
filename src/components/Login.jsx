import { Flex, Input, Button, Stack } from "@chakra-ui/react"
import {useState} from "react"
import { useHistory } from "react-router-dom"

function Login() {

    const history = useHistory()
    const [formData, setFormData] = useState({
        name: "",
        password_digest: "",
      })

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

     const handleLogin = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(formData)
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
            console.log(data)
            history.push("/flyers")
        })
    }

    return (
        <Flex justifyContent='center'>
            <form onSubmit={handleLogin}>
                <Stack>
                <Input name='name' onChange={handleChange} placeholder='Name' />
                <Input name='password_digest' onChange={handleChange} placeholder='Password' />
                <Button  type="submit" colorScheme="blue">Login</Button>
                </Stack>
            </form>
        </Flex>
    )
}



export default Login