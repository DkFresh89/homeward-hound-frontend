import { Flex, Text, Textarea, Input, Box, Button } from "@chakra-ui/react"
import {useState, useEffect, useCallback} from "react"
import { useHistory } from "react-router-dom"
import { GoogleMap, StreetViewService, useJsApiLoader } from '@react-google-maps/api';
import TimePicker from 'react-time-picker';
// import 'react-clock/dist/Clock.css';

function NewSighting({currentUser}) {

    const [time, setTime] = useState('12:00')

    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        description: "",
        user_id: null,
        missing_flyer_id: null
    })

    
    // {currentUser ? console.log(currentUser.id) : null}
    useEffect(() => {
        if (currentUser){
            console.log(currentUser);
            setFormData({...formData, user_id: currentUser.id})
        }
    }, [])

    console.log(time);
    
    const handleChange = (e) => {
        // console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleCreateSighting = (e) => {
        e.preventDefault()
        // getLocation()
        console.log(formData);
        fetch("http://localhost:3000/create_sighting", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            // updateFlyers(data.data)
            // history.push("/flyers") 
        })
    }

    const [map, setMap] = useState(null)

    const containerStyle = {
        width: '400px',
        height: '400px'
      };

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })
      
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        // console.log(map);
        setMap(map)
    }, [])

    
    
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    
    
    
    return(
        <Flex justifyContent='center' marginTop='100px' textAlign='center'>
            <form onClick={handleCreateSighting}>
                <Text margin='2'>Sighting</Text>
            <Box margin='2'>
            <TimePicker 
                onChange={setTime}
                value={time}
                format='h:mm a'
                disableClock
            />
            </Box>
            <Box >
            <Textarea 
                name='description'
                onChange={handleChange}
                placeholder="Description"
                size="lg"
            />
            </Box>
            {/* <Box>
                <iframe src={`https://maps.googleapis.com/maps/api/geocode/json?address=22+Orchard+Drive,
+East Williston,+NY&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}/>
            </Box> */}




            {/* {isLoaded ? <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={onLoad}
                onUnmount={onUnmount}
                center={{
                    lat: 40.713468006091794,
                    lng: -74.0150387326917
                }}
                options={
                    {streetViewControl: false,
                    geocoder: true
                        }
                }
            >

            </GoogleMap> : null} */}


            <Flex justifyContent='center'><Button type="submit" colorScheme="blue">
                Submit
            </Button></Flex>
            </form>
        </Flex>
    )
}

export default NewSighting