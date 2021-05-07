import { Box, Flex, Text, Divider, Badge, Stack } from "@chakra-ui/react";
import { GoogleMap, StreetViewService, useJsApiLoader, Marker } from '@react-google-maps/api';
import {useState, useCallback} from "react"
import logo from './paw.svg'


function SightingCard({sighting, currentUser}) {

    // console.log(sighting);

    let dog = null

    sighting.attributes.dog != null ? dog=sighting.attributes.dog : dog=null

    const [map, setMap] = useState(null)

    const containerStyle = {
        width: '100%',
        height: '200px'
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

    console.log(dog);

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
            {isLoaded ?
            <Flex bottom='0' padding='2'>
                
            <GoogleMap
                bottom='0'
                mapContainerStyle={containerStyle}
                onLoad={onLoad}
                onUnmount={onUnmount}
                zoom={15}
                center={{
                    lat: sighting.attributes.latitude,
                    lng: sighting.attributes.longitude
                }}
                options={
                    {streetViewControl: false,
                        mapTypeControl: false,
                        overviewMapControl: false
                        
                    }
                }
            
            >
            { <Marker icon={logo} position={{ lat: sighting.attributes.latitude, lng: sighting.attributes.longitude }} />}

                <></>
            </GoogleMap></Flex>
            : null}
            </Stack>
            </Flex>
        </Flex>
    )
}

export default SightingCard