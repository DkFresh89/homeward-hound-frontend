import { Flex } from "@chakra-ui/react"
import {useState, useHistory, useCallback} from "react"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const api = process.env.REACT_APP_GOOGLE_API_KEY

console.log(api)

function CreateFlyer() {

//**************Google Maps API Setup*************************************/
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: api
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
      <Flex>
        <form onSubmit={handleCreateFlyer}>
            {isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
            ) : (
            <></>
            )}
        </form>
      </Flex>
    );
}

export default CreateFlyer