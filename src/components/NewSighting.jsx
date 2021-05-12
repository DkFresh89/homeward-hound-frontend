import { Flex, Text, Textarea, Input, Box, Button, Stack, Select } from "@chakra-ui/react"
import {useState, useEffect, useCallback, useRef} from "react"
import { useHistory } from "react-router-dom"
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";
import logo from './paw.svg'
const libraries = ['places']

const mapContainerStyle = {
    width: '300px',
    height: '200px'
};

const center = {
    lat: 40.712776,
    lng: -74.005974
}

const options = {
    disableDefaultUI: true,
    zoomControl: true
}


function NewSighting({currentUser, setSightings, sightings, flyers}) {

    
   
    const [address, setAddress] = useState("")
    const [time, setTime] = useState('')
    const [date, setDate] = useState(new Date())
    
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        description: "",
        user_id: null,
        missing_flyer_id: null,
        time_stamp: time,
        date: date
    })

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    })

    const [markers, setMarkers] = useState([])
    // const [selected, setSelected] = useState(null)

    const onMapClick = useCallback((e) => {
        setMarkers(markers => [...markers, {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date()
        }])
        
    }, [])
    
    const setLoc = () => {
        
        setFormData({...formData, latitude: markers[0].lat, longitude: markers[0].lng})
        console.log(markers[0].lat);
        console.log(markers[0].lng);
    
    }
    
    const history = useHistory()

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])
    
    
    // {currentUser ? console.log(currentUser.id) : null}
    useEffect(() => {
        if (currentUser){
            console.log(currentUser);
            setFormData({...formData, user_id: currentUser.id})
        }
    }, [])

    // console.log( formData);
    
    const handleChange = (e) => {
        
        // console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    
    const handleTime = (e) => {
        
        // console.log(e.target.name);
        setFormData({ ...formData, time_stamp: e.target.value})
    }

    const handleDate = (e) => {
       setFormData({...formData, date: e.target.value})
    }
    // console.log(formData);

    const handleAddress = (e) => {
        // console.log(e.target.value);
        const newAddress = e.target.value
        setAddress({newAddress})
    }
    const handleImage = (e) => {
        setFormData({ ...formData, image: ',' + e.target.value })
        // console.log(formData);
    }

    const getLocation = () => {
        console.log(address['newAddress']);
        Geocode.fromAddress(address['newAddress']).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
            //   console.log(response);
                setFormData({...formData, latitude: lat,
                longitude: lng})
                console.log(formData);
            },
            (error) => {
                console.error(error);
            }
            )
        // console.log(address.newAddress);
        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        // .then(resp => resp.json())
        // .then(data => console.log(data))
    }

    console.log(flyers);

    const dogList = flyers.map(flyer => {
        console.log(flyer.attributes.dog.name);
        return(<option key={flyer.id} value={flyer.id}>{flyer.attributes.dog.name}</option>) 
    })

    const handleDogs = (e) => {
        console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleCreateSighting = (e) => {
        e.preventDefault()
        // console.log(formData);
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
            // console.log(data.data);
            setSightings([...sightings, data.data])
            history.push("/sighting") 
        })
    }

    
    return(
        <Flex justifyContent='center' marginTop='100px' textAlign='center' h='72vh'>
            <Stack>
                <Text margin='2'>Sighting</Text>
                <Select name='missing_flyer_id' onChange={handleDogs} placeholder="Select Missing Dog">
                {dogList}
            </Select>
                
<Input onChange={handleDate} type='date' format='MM/d/y'/>
<Input onChange={handleTime} type='time'/>
<Input onChange={handleAddress} placeholder='Address'/>
            <Flex justifyContent='center'><Button onClick={getLocation} colorScheme="blue">
                Set Location
            </Button></Flex>
            <Input placeholder='Images' name='image' onChange={handleImage} />
            <Textarea 
                name='description'
                onChange={handleChange}
                placeholder="Description"
                size="lg"
            />

{/* <form > */}
{/* 
{ isLoaded ? <GoogleMap
                bottom='0'
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                // onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map(marker => 
                <Marker 
                key={marker.time.toISOString()} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                    url: logo,
                    scaledSize: new window.google.maps.Size(30,30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15)
                }} */}
                {/* // onClick={() => { */}
            
            {/* { <Marker icon={logo} position={{ lat: sighting.attributes.latitude, lng: sighting.attributes.longitude }} />} */}

            {/* {selected ? (<InfoWindow position={{ lat: selected.lat, lng :selected.lng}} onCloseClick={() => {setSelected(null)}}>
                <Box>
                    <Text color='black'>Spotted!</Text>
                </Box>
            </InfoWindow>) : null} */}

            {/* </GoogleMap> : null} */}


            <Flex justifyContent='center'><Button onClick={handleCreateSighting} colorScheme="blue">
                Submit
            </Button></Flex>
            {/* </form> */}
            </Stack>
        </Flex>
    )
}

export default NewSighting