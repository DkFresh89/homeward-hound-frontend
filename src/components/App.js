import '../App.css';
import { Flex, Text, Box, Container, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton} from "@chakra-ui/react"
import { Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
import  SideBar  from "./SideBar";
import Signup from './Signup'
import {useState} from "react"


function App() {

  const [warning, setWarning] = useState(false)

  const handleWarning = () => {
    setWarning(warning => !warning)
  }

  return (
    <Flex>
      <Stack w='100%'>
      <Flex w='100%'>
        <SideBar />
        <NavBar/>
        {/* <Container>
          <Text>Container</Text>
        </Container> */}
      </Flex>
                {!warning ? <Flex><Alert         status="warning" 
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px">
                <AlertIcon boxSize="40px" mr={0}/>
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    CAUTION!
                  </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Please exercise extreme caution! Dogs are our best friends but they may not be friendly if they do not know you. Please report from a safe distance. Approach/Interact with dogs at your own risk!
                </AlertDescription>
                <CloseButton onClick={handleWarning} position="absolute" right="8px" top="8px" />
            </Alert></Flex> : null}
      
          
      <Switch>
        <Route path="/signup">
          <Container justifyContent='center'>
            <Signup />
          </Container>
        </Route>
      </Switch>
      </Stack>
    </Flex>
  );
}

export default App;
