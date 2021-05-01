import { Flex, Text, Box, Image, Button,Badge, ButtonGroup, Radio, FormLabel, Stack, RadioGroup, Textarea, Input, Divider } from "@chakra-ui/react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useState} from "react"
import { useHistory } from "react-router-dom"



function FlyerCard({flyer}) {

    const [updateToggle, setUpdateToggle] = useState(false)
    const history = useHistory()

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        adaptiveHeight: true
    }
    // console.log(id);

    const [formData, setFormData] = useState({
        description: flyer.attributes.description,
        reward: flyer.attributes.reward,
        found: false
    })

    const dog = flyer.attributes.dog
    const pics = flyer.attributes.dog.image
    const stock = 'https://st2.depositphotos.com/thumbs/32032774/vector/46237/462377004/api_thumb_450.jpg'

    const carouselPics = pics.map(pic => {
        return(<Box><Image src={pic}/></Box>)
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
        .then(flyer => console.log(flyer))
        
    }
    
    console.log(flyer);
    // console.log(pics);

    return(
        <Flex padding='2'>
            <Box textAlign='center'>
            <form onSubmit={handleSubmit}>
                <Box padding='1'>Name: {dog.name}</Box>
                <Divider />
                <Box padding='1'>Breed: {dog.breed}</Box>
                <Divider />
                <Box padding='1'>Age: {dog.age}</Box>
                <Divider />
                <Box padding='1'>Temperament: {dog.temperament}</Box>
                <Divider />
                <Badge borderRadius="full" px="2" colorScheme="red">
                    Reward
                </Badge>
                <Box padding='2' margin='3' w='300px'> {pics[0] == null ? <Image src={stock}/> : <Slider {...settings}>{carouselPics}</Slider> } </Box>


                
                {updateToggle && 
                <>
                <RadioGroup onChange={handleReward} padding='1' >
                <FormLabel>Reward Offered?</FormLabel>
                <Stack direction="row">
                    <Radio value={`${true}`}>Yes</Radio>
                    <Radio value={`${false}`}>No</Radio>
                </Stack>
                </RadioGroup>
                <RadioGroup onChange={handleFound} padding='1'>
                <FormLabel>Has the dog been found?</FormLabel>
                <Stack direction="row">
                    <Radio value={`${true}`}>Yes</Radio>
                    <Radio value={`${false}`}>No</Radio>
                </Stack>
                </RadioGroup>
                <Textarea
                    name='description'
                    onChange={handleChange}
                    placeholder={flyer.attributes.description}
                    size="md"
                />
                <Button type='submit' colorScheme='red' margin='2'>Submit</Button>
                </>}
            </form>
            
            {!updateToggle && <Button onClick={handleUpdate} colorScheme='red' margin='2'>Update</Button>}
            </Box>
        </Flex>
    )
}

export default FlyerCard