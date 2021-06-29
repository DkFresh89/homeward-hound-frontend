import { Center, Image, Stack } from "@chakra-ui/react";
import logo from './HomewardHound.png'



function LandingPage() {

    return (
        <Center margin='10'>
            <Stack>
                <Image src={logo}  />
                <iframe width="600" height="450" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/view?zoom=10&center=40.7128%2C-74.0060&key=AIzaSyAVsRzJ9I2p_mhglqQc9dtsx9PrgHEFbJE"/>
            </Stack>
        </Center>
    )
}

export default LandingPage