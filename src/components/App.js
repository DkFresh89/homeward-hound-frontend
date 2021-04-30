import '../App.css';
import { Flex, Text, Box, Container, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton} from "@chakra-ui/react"
import { Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
import  SideBar  from "./SideBar";
import Signup from './Signup'
import Login from './Login'
import FlyersContainer from './FlyersContainer'
import {useState, useEffect} from "react"
import AddDog from './AddDog';
import CreateFlyer from './CreateFlyer';



function App() {


  const [warning, setWarning] = useState(false)
  const [flyers, setFlyers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const handleWarning = () => {
    setWarning(warning => !warning)
  }

  useEffect(() => {
    fetch('http://localhost:3000/missing_flyers')
      .then(resp => resp.json())
      .then(flyerArray => {
        // console.log(flyerArray.data);
        setFlyers(flyerArray.data)})
  }, [])

  console.log(flyers);

  return (
    <Flex direction='column' justifyContent='center'>
      <Stack w='100%' >
      <Flex w='100%'>
        {/* <SideBar /> */}
        <NavBar setCurrentUser={setCurrentUser} setWarning={setWarning}/>
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
      
          </Stack>
          
      <Switch>
          <Container w='100%'>
        <Route path="/signup">
          <Signup setCurrentUser={setCurrentUser}/>
        </Route>
        <Route path='/login'>
          <Login setCurrentUser={setCurrentUser}/>
        </Route>
        <Route path='/add_dog'>
          <AddDog />
        </Route>
        <Route path='/flyers'>
          <FlyersContainer flyers={flyers} />
          {/* <CreateFlyer currentUser={currentUser} setFlyers={setFlyers}/> */}
        </Route>
        <Route path="create_flyer">
        </Route>
          </Container>
      </Switch>
      
    </Flex>
  );
}

export default App;
