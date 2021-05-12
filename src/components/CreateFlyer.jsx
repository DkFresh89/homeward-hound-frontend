import { Flex, Textarea, Button, VStack, Spacer, Box, Input, Select } from "@chakra-ui/react"
import {useState, useCallback} from "react"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { useHistory } from "react-router-dom"



function CreateFlyer({updateFlyers, userDogs}) {
    
    const [map, setMap] = useState(null)
    // console.log(currentUser.dogs);
    const history = useHistory()



//**************Geocode****************************************/

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
Geocode.setLanguage("en")
Geocode.setLocationType("ROOFTOP")

//*************************************************************/

//**************Google Maps API Setup*************************************/

        const containerStyle = {
            width: '400px',
            height: '400px'
        };

        const center = {
            lat: 40.713468006091794, 
            lng: -74.0150387326917
        };

        const options = {
            streetViewControl: false,
            mapTypeControl: false
        }

        // console.log(center);


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
/***************************************************************************/
    // const history = useHistory()
    // const id = currentUser.id
    // console.log(id);
    const [address, setAddress] = useState("")
    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        description: "",
        reward: false,
        found: false,
        dog_id: null
    })
    // console.log(currentUser.id);
    const dogList = userDogs.map(dog => {
        // console.log(dog.id);
        return(<option key={dog.id} value={dog.id}>{dog.name}</option>) 
    })

    const handleChange = (e) => {
        console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    // console.log(formData.dog_id);

    const handleRadio = (e) => {
        setFormData({...formData, good_sam: e})
    }
    const handleAddress = (e) => {
        // console.log(e.target.value);
        const newAddress = e.target.value
        setAddress({newAddress})
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

    const handleCreateFlyer = (e) => {
        e.preventDefault()
        getLocation()
        console.log(formData);
        fetch("http://localhost:3000/create_flyer", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);
            updateFlyers(data.data)
            history.push("/flyers") 
        })
    }

    return (
    <Flex justifyContent='center' marginTop='100px'>
        <VStack spacing='240px'>
        <form onSubmit={handleCreateFlyer}>
            {/* <Text mb="8px">Description: {value}</Text> */}
            <Select name='dog_id' onChange={handleChange} placeholder="Select Missing Dog">
                {dogList}
            </Select>
            <Input onChange={handleAddress} placeholder='Address'/>
            <Flex justifyContent='center'><Button onClick={getLocation} colorScheme="blue">
                Set Location
            </Button></Flex>
        <Textarea
            name='description'
            onChange={handleChange}
            placeholder="Description"
            size="sm"
        />
            {isLoaded ? (
                <Flex justifyContent='center' >
            <GoogleMap
                mapContainerStyle={containerStyle}
                // center= {{lat: 40.713468006091794, lng: -74.0150387326917}}
                center={{
                    lat: 40.713468006091794,
                    lng: -74.0150387326917
                }}
                zoom={1}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options= {options}
            >
                <Marker position={{ lat: 40.713468006091794, lng: -74.0150387326917}} />
                
                <></>
            </GoogleMap></Flex>
            ) : (
            <></>
            )}
            <Box h='2'/>
            <Spacer/>
            <Flex justifyContent='center'><Button type="submit" colorScheme="blue">
                Submit
            </Button></Flex>
        </form>
        </VStack>
    </Flex>





    );
}

export default CreateFlyer