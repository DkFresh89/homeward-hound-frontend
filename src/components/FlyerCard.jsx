import { Flex, Text, Box, Image, Button,Badge, ButtonGroup } from "@chakra-ui/react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useState} from "react"



function FlyerCard({flyer, handleUpdate}) {

    const [updateToggle, setUpdateToggle] = useState(false)

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

    const dog = flyer.attributes.dog
    const pics = flyer.attributes.dog.image
    const stock = 'https://st2.depositphotos.com/thumbs/32032774/vector/46237/462377004/api_thumb_450.jpg'

    // console.log(dog.id);
    const carouselPics = pics.map(pic => {
        return(<Box><Image src={pic}/></Box>)
    })

    // console.log(pics);

    return(
        <Flex>
            <Box textAlign='center'>
                <Box>Name: {dog.name}</Box>
                <Box>Breed: {dog.breed}</Box>
                <Box>Temperament: {dog.temperament}</Box>
                <Badge borderRadius="full" px="2" colorScheme="red">
                    Reward
                </Badge>
                <Box padding='2' margin='3' w='300px'> {pics[0] == null ? <Image src={stock}/> : <Slider {...settings}>{carouselPics}</Slider> } </Box>
                <Button id={flyer.id} onClick={handleUpdate} colorScheme='red' margin='2'>Update</Button>
            </Box>
        </Flex>
    )
}

export default FlyerCard