import { Flex, Text, Box, Image, Button,Badge, ButtonGroup, Radio, FormLabel, Stack, RadioGroup, Textarea, Input, Divider,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useState, useCallback, useRef} from "react"
import { useHistory } from "react-router-dom"
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import logo from './paw.svg'
const libraries = ['places']

const mapContainerStyle = {
    width: '400px',
    height: '200px'
};


const options = {
    disableDefaultUI: true,
    zoomControl: true
}



function FlyerCard({flyer, currentUser}) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selected, setSelected] = useState(null)
    
    const initialState = currentUser ? currentUser.id : null
    const [updateToggle, setUpdateToggle] = useState(false)
    const [toggleReward, setToggleReward] = useState(flyer.attributes.reward)
    const [userId] = useState(initialState)
    const history = useHistory()

    const center = {
        lat: flyer.attributes.latitude !== null ? flyer.attributes.latitude : 40.712776,
        lng: flyer.attributes.longitude !== null ? flyer.attributes.longitude : -74.005974
    }
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    })

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    console.log(flyer.attributes.dog.user_id);

const flyerUserId = flyer.attributes.dog.user_id

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        adaptiveHeight: true
    }
  

    const [formData, setFormData] = useState({
        description: flyer.attributes.description,
        reward: flyer.attributes.reward,
        found: false
    })

    const dog = flyer.attributes.dog
    const pics = flyer.attributes.dog.image
    const stock = 'https://st2.depositphotos.com/thumbs/32032774/vector/46237/462377004/api_thumb_450.jpg'

    const carouselPics = pics.map(pic => {
        return(<Box><Image key={pic} src={pic}/></Box>)
    })
    
    const handleUpdate = () => {
        setUpdateToggle(updateToggle => setUpdateToggle(!updateToggle))
    }
    
    const handleChange = (e) => {
        console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const handleReward = (e) => {
        setFormData({...formData, reward: e})
    }
    const handleFound = (e) => {
        setFormData({...formData, found: e})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setUpdateToggle(updateToggle => !updateToggle)
        // console.log(parseInt(e.target.name));
        // setDogId(parseInt(e.target.name))
        // setFlyerId(e.target.id)
        fetch(`http://localhost:3000/flyers/${flyer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(flyer => {
            
            // console.log(flyer.data.attributes.reward)
            setToggleReward(flyer.data.attributes.reward)
        })
        
    }

    function LastSeen() {
        const { isOpen, onOpen, onClose } = useDisclosure()
        return (
                <>
                    <Divider/>
                    <Button margin='3' onClick={onOpen}>Map</Button>
            
                    <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Last Seen:</ModalHeader>
                        {/* <ModalCloseButton /> */}
                        <ModalBody>
                        { isLoaded ? <GoogleMap
                bottom='0'
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                // onClick={onMapClick}
                onLoad={onMapLoad}
            >

            { <Marker  icon={{
                    url: logo,
                    scaledSize: new window.google.maps.Size(30,30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15)
                }} position={{ lat: flyer.attributes.latitude, lng: flyer.attributes.longitude }} />}

            {selected ? (<InfoWindow position={{ lat: selected.lat, lng :selected.lng}} onCloseClick={() => {setSelected(null)}}>
                <Box>
                    <Text color='black'>Spotted!</Text>
                </Box>
            </InfoWindow>) : null}

            </GoogleMap> : null}
                        </ModalBody>
            
                        <ModalFooter justifyContent='center'>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        </ModalFooter>
                    </ModalContent>
                    </Modal>
                <Divider/>
                </>
            )
        }
    
 

    return (
        <Flex padding="2" w="100%">
            <Box textAlign="center">
                <form onSubmit={handleSubmit}>
                    <Box padding="1">Name: {dog.name}</Box>
                    <Divider />
                    <Box padding="1">Breed: {dog.breed}</Box>
                    <Divider />
                    <Box padding="1">Age: {dog.age}</Box>
                    <Divider />
                    <Box padding="1">Temperament: {dog.temperament}</Box>
                    <Divider />
                    <Box w="300px" padding="1">
                        Description: {flyer.attributes.description}
                    </Box>
                    {toggleReward === true ? (
                        <>
                        <Divider/>
                        <Badge marginTop='2' borderRadius="full" px="2" colorScheme="red">
                            Reward
                        </Badge>
                        </>
                    ) : null}
                    <Box margin="3">
                        <LastSeen />
                    </Box>
                    <Box padding="2" margin="3" w="300px">
                        {" "}
                        {pics[0] == null ? (
                            <Image src={stock} />
                        ) : (
                            <Slider {...settings}>{carouselPics}</Slider>
                        )}{" "}
                    </Box>

                    {updateToggle && ( 
                        <Box bg="gray.500" borderRadius="md" justifyContent="center">
                            <RadioGroup onChange={handleReward} padding="1">
                                <FormLabel>Reward Offered?</FormLabel>
                                <Stack direction="row">
                                    <Radio value={`${true}`}>Yes</Radio>
                                    <Radio value={`${false}`}>No</Radio>
                                </Stack>
                            </RadioGroup>
                            <RadioGroup onChange={handleFound} padding="1">
                                <FormLabel>Has the dog been found?</FormLabel>
                                <Stack direction="row">
                                    <Radio value={`${true}`}>Yes</Radio>
                                    <Radio value={`${false}`}>No</Radio>
                                </Stack>
                            </RadioGroup>
                            <Textarea
                                name="description"
                                onChange={handleChange}
                                placeholder={flyer.attributes.description}
                                size="md"
                            />
                            <Button type="submit" colorScheme="red" margin="2">
                                Submit
                </Button>
                        </Box>
                    )}
                </form>

                {!updateToggle && flyerUserId === userId ? (
                    <Button onClick={handleUpdate} colorScheme="red" margin="2">
                        Update Your Flyer
                    </Button>
                ) : null}
            </Box>
        </Flex>
    );
}

export default FlyerCard