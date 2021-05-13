import '../App.css';
import { Flex, Box, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, ScaleFade, Center} from "@chakra-ui/react"
import { Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
// import  SideBar  from "./SideBar";
import Signup from './Signup'
import Login from './Login'
import FlyersContainer from './FlyersContainer'
import {useState, useEffect} from "react"
import AddDog from './AddDog';
import CreateFlyer from './CreateFlyer';
import NewSighting from './NewSighting';
import SightingContainer from './SightingContainer';
import Dogs from './Dogs'
import LandingPage from './LandingPage'
import Footer from './Footer'




function App() {


  // const history = useHistory()
  const [warning, setWarning] = useState(false)
  const [flyers, setFlyers] = useState([])
  const [sightings, setSightings] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [userDogs, setUserDogs] = useState([])
  




  

  const handleWarning = () => {
    setWarning(warning => !warning)
  }

  const updateFlyers = (data) => {
    setFlyers([...flyers, data])
  }

  // console.log(currentUser);

  useEffect(() => {
    // let isMounted = true; // note this flag denote mount status
    fetch('http://localhost:3000/missing_flyers')
      .then(resp => resp.json())
      .then(flyerArray => {
        // console.log(flyerArray.data);
        // if (isMounted) 
        setFlyers(flyerArray.data)})
        // return () => { isMounted = false }
  }, [])

  useEffect(() => {
    // let isMounted = true; // note this flag denote mount status
    fetch('http://localhost:3000/sightings')
      .then(resp => resp.json())
      .then(sightingArray => {
        // console.log(sightingArray.data);
        // if (isMounted) 
        setSightings(sightingArray.data)})
        // return () => { isMounted = false }
  }, [])

  useEffect(() => {
    const getUser = localStorage.getItem("user")

    if (getUser) {
      setCurrentUser(JSON.parse(getUser))
    }
  }, [])



  // console.log(flyers);

  return (
    <Box  >
      <Stack   >
      <Flex w='100%'>
        {/* <SideBar /> */}
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} setWarning={setWarning}/>
        {/* <Container>
          <Text>Container</Text>
        </Container> */}
      </Flex>
      </Stack>
      
        {/* <Flex marginTop='150'  > */}
      <Switch>
          <Box marginTop='200px' >

          {!warning ?<Center alignContent='center' > <ScaleFade in={!warning}><Flex
                marginTop='150'
                position='fixed'
                zIndex='overlay'
                justifyContent='center'
                left='725px'
                ><Alert   
                    
                    borderRadius="lg"       
                    status="warning" 
                    variant="solid"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="275px">
                <AlertIcon boxSize="40px" mr={0}/>
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    CAUTION!
                  </AlertTitle>
                <AlertDescription maxWidth="md">
                  Please exercise extreme caution! Dogs are our best friends but they may not be friendly if they do not know you. Please report from a safe distance. Approach/Interact with dogs at your own risk!
                </AlertDescription>
                <CloseButton onClick={handleWarning} position="absolute" right="8px" top="8px" />
            </Alert></Flex></ScaleFade> </Center> : null}

        
        <Route path="/signup">
          <Signup setCurrentUser={setCurrentUser}/>
        </Route>
        <Route path='/login'>
          <Login setCurrentUser={setCurrentUser} setUserDogs={setUserDogs}/>
        </Route>
        <Route path='/add_dog'>
          <AddDog currentUser={currentUser} userDogs={userDogs} setUserDogs={setUserDogs}/>
        </Route>
        <Route  path='/flyers'>
          <FlyersContainer setFlyers={setFlyers} currentUser={currentUser} flyers={flyers} />
        </Route>
        <Route path='/sighting'>
          <SightingContainer currentUser={currentUser} sightings={sightings} setSightings={setSightings} />
        </Route>
        <Route path='/new_sighting'>
          <NewSighting flyers={flyers} sightings={sightings} setSightings={setSightings} currentUser={currentUser}/>
        </Route>
        <Route path="/new_flyer">
          <CreateFlyer flyers={flyers} userDogs={userDogs} currentUser={currentUser} updateFlyers={updateFlyers}/>
        </Route>
        <Route path='/dogs'>
          <Dogs currentUser={currentUser} userDogs={userDogs} setUserDogs={setUserDogs} />
        </Route>
        <Route exact path='/'>
          <LandingPage />
        </Route>
          </Box>
      </Switch>



      {/* </Flex> */}
      <Footer />
    </Box>
  );
}

export default App;
