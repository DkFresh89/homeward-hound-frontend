import { Box, Flex, Text, Divider, Badge, Stack } from "@chakra-ui/react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import {useState, useCallback, useRef} from "react"
import logo from './paw.svg'
const libraries = ['places']

const mapContainerStyle = {
    width: '300px',
    height: '200px'
};


const options = {
    disableDefaultUI: true,
    zoomControl: true
}

function SightingCard({sighting, currentUser}) {
    
    const center = {
        lat: sighting.attributes.latitude !== null ? sighting.attributes.latitude : 40.712776,
        lng: sighting.attributes.longitude !== null ? sighting.attributes.longitude : -74.005974
    }
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    })

    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null)

    const onMapClick = useCallback((e) => {
        setMarkers(markers => [...markers, {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date()
        }])
    }, [])

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])


    let dog = null
    sighting.attributes.dog != null ? dog=sighting.attributes.dog : dog=null
    
    // const [map, setMap] = useState(null)
    
    
    
    // const { isLoaded } = useJsApiLoader({
        //     id: 'google-map-script',
        //     googleMapsApiKey: 
        // })
        
        // const onLoad = useCallback(function callback(map) {
            //     const bounds = new window.google.maps.LatLngBounds();
            //     map.fitBounds(bounds);
            //     // console.log(map);
            //     setMap(map)
            // }, [])
            
            
            
            // const onUnmount = useCallback(function callback(map) {
                //     setMap(null)
                // }, [])
                
                // console.log(dog);
                
    return (
        <Flex w='300px'  >
            <Flex >
                <Stack>
                { dog != null ?<Flex padding='3' justifyContent='center'> <Badge
                    colorScheme='yellow'
                    variant='solid'
                >Attached to flyer for:  {dog.name}</Badge></Flex> 
                : null }

            { dog != null ? <Divider/> : null}
            <Flex justifyContent='center' padding='1'>Sighting ID: {sighting.id}</Flex>
            <Divider />
            {sighting.attributes.user != null &&<> <Box padding='1'>Owner: {sighting.attributes.user["name"]}</Box><Divider /> </>}
            {sighting.attributes.missing_flyer != null &&<> <Box padding='1'>Flyer information: {sighting.attributes.missing_flyer["description"]}</Box><Divider /> </>}
            
            <Box padding='1'>Description: {sighting.attributes.description}</Box>
            {/* <Divider /> */}
            {/* {sighting.attributes.user === null & sighting.attributes.missing_flyer === null ? <Text>asdf</Text> : null} */}
            {dog != null && 
                <Box >
                <Divider/>
                <Text>Dog Info:</Text>
                <Box padding='1'>Name: {dog.name}</Box>
                <Box padding='1'>Breed: {dog.breed}</Box>
                <Box padding='1'>Temperament: {dog.temperament}</Box>
                </Box>
            }
            
            {/* <Flex bottom='0' padding='2'> */}
                
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
                }} position={{ lat: sighting.attributes.latitude, lng: sighting.attributes.longitude }} />}

            {selected ? (<InfoWindow position={{ lat: selected.lat, lng :selected.lng}} onCloseClick={() => {setSelected(null)}}>
                <Box>
                    <Text color='black'>Spotted!</Text>
                </Box>
            </InfoWindow>) : null}

            </GoogleMap> : null}
            
            {/* </Flex> */}
            


            </Stack>
            </Flex>
        </Flex>
    )
}

export default SightingCard

