import { AspectRatio, Center, Flex, Image, Stack } from "@chakra-ui/react";
import logo from './HomewardHound.png'
import {CloudinaryContext, Image as CloudImage, Transformation} from 'cloudinary-react';


function LandingPage() {

    return (
        <Center margin='10'>
            <Stack>
            <CloudinaryContext cloudName="dkmedia">
             <Transformation  crop="scale" width="300">
            <CloudImage cloudName="dkmedia" publicId='Amit_Dog_wveund'/>
           </Transformation>
            </CloudinaryContext>
            <Image src={logo}  />
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15831087303!2d-74.11976281881005!3d40.69766374799458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sng!4v1620087460908!5m2!1sen!2sng" 
            width="600" 
            height="450"  
            loading="lazy"
            maptype='retro'
            radius='2'
            >
            </iframe> */}
            <iframe width="600" height="450" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/view?zoom=10&center=40.7128%2C-74.0060&key=AIzaSyAVsRzJ9I2p_mhglqQc9dtsx9PrgHEFbJE"></iframe>
            
            {/* <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15831087303!2d-74.11976281881005!3d40.69766374799458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sng!4v1620087460908!5m2!1sen!2sng"
    alt="demo"
    width="600" height="1150" 
  /> */}
  {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
 
        </Stack>
        </Center>
    )
}

export default LandingPage