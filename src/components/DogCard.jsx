import { Flex, Box, Image, Divider, Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useRef, useState} from 'react'


function DogCard({dog, handleConfirm}) {

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

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
        <Flex fontFamily='Fjalla One' fontWeight='bold' justifyContent='center' textAlign='center' padding='2'>
            <Box>
            <Box letterSpacing='.5px'>Name: {dog.name}</Box>
            <Divider />
            <Box>Breed: {dog.breed}</Box>
            <Divider />
            <Box>Age: {dog.age}</Box>
            <Divider/>
            <Box>Temperament: {dog.temperament}</Box>
            <Divider/>
            <Box  padding='2' margin='3' w='300px'> {pics[0] == null ? <Image  src={stock}/> : <Slider  {...settings}>{carouselPics}</Slider> } </Box>
            <Flex justifyContent='center' padding='3'>

                    <Button letterSpacing='1px' boxShadow='dark-lg' colorScheme="red" onClick={() => setIsOpen(true)}>
                Delete Dog
            </Button>

            <AlertDialog
                motionPreset="slideInBottom"
                isCentered
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Dog
                    </AlertDialogHeader>

                    <AlertDialogBody >
                    Are you sure? You can't undo this action afterwards, but you can always add a new dog.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button boxShadow="xl" ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button   boxShadow="xl" colorScheme="red" onClick={handleConfirm} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            </Flex>
        </Box>
        </Flex>
    )
}

export default DogCard