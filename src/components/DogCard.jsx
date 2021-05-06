import { Flex, Text, Box, Image, Stack, Divider, Button } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function DogCard({dog, handleConfirm}) {

    // console.log(dog);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        adaptiveHeight: true
    }

    const pics = dog.image
    const stock = "https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif"

    const carouselPics = pics.map(pic => {
        // console.log(pic);
        return(<Box><Image key={pic} src={pic}/></Box>)
    })

    

    return(
        <Flex justifyContent='center' textAlign='center' padding='2'>
            <Box>
            <Box>Name: {dog.name}</Box>
            <Divider />
            <Box>Breed: {dog.breed}</Box>
            <Divider />
            <Box>Age: {dog.age}</Box>
            <Divider/>
            <Box>Temperament: {dog.temperament}</Box>
            <Divider/>
            <Box padding='2' margin='3' w='300px'> {pics[0] == null ? <Image src={stock}/> : <Slider  {...settings}>{carouselPics}</Slider> } </Box>
            <Flex justifyContent='center'>
                <Button colorScheme='red' margin='2' boxShadow="dark-lg" name={dog.id} onClick={handleConfirm}>Delete</Button>
            </Flex>
        </Box>
        </Flex>
    )
}

export default DogCard