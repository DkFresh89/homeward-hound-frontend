import { Flex, Textarea, Text, Button, Stack, Spacer, Box, Input } from "@chakra-ui/react"
import {useState, useHistory, useCallback} from "react"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Login from "./Login";

const containerStyle = {
    width: '400px',
    height: '400px'
};

// const center = {
//     lat: 40,
//     lng: -74
// };

function CreateFlyer() {

//**************Google Maps API Setup*************************************/
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
        })
        
        const [map, setMap] = useState(null)
        
        const onLoad = useCallback(function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
            setMap(map)
        }, [])
        
        const onUnmount = useCallback(function callback(map) {
            setMap(null)
        }, [])
/***************************************************************************/
    // const history = useHistory()
    const [address, setAddress] = useState("")
    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        description: "",
        reward: null,
        found: false,
        dog_id: 1
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleRadio = (e) => {
        setFormData({...formData, good_sam: e})
    }
    const handleAddress = (e) => {
        console.log(e.target.value);
        const newAddress = e.target.value
        setAddress({newAddress})
    }

    const getLocation = () => {
        console.log(address.newAddress);
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    const handleCreateFlyer = (e) => {
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
            // history.push("/flyers") 
        })
    }

    return (
    <Flex justifyContent='center'>
        <Stack>
        <form onSubmit={handleCreateFlyer}>
            {/* <Text mb="8px">Description: {value}</Text> */}
            <Input onChange={handleAddress} placeholder='Address'/>
            <Button onClick={getLocation} colorScheme="blue">
                Set Location
            </Button>
        <Textarea
            // value={value}
            // onChange={handleInputChange}
            placeholder="Description"
            size="sm"
        />
            {isLoaded ? (
                <Flex >
            <GoogleMap
                mapContainerStyle={containerStyle}
                defaultCenter={{ lat: 40.713, lng: -74.015}}
                zoom={4}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker position={{ lat: 40.713468006091794, lng: -74.0150387326917}} />
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap></Flex>
            ) : (
            <></>
            )}
            <Box h='2'/>
            <Spacer/>
            <Button type="submit" colorScheme="blue">
                Submit
            </Button>
        </form>
        </Stack>
    </Flex>
    );
}

export default CreateFlyer