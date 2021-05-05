import { Box, Flex, Text, Divider } from "@chakra-ui/react";


function SightingCard({sighting,currentUser}) {

    // console.log(sighting);

    return (
        <Flex >
            <Box>
            <Box>Sighting ID: {sighting.id}</Box>
            <Divider />
            {sighting.attributes.user != null &&<> <Box>Owner: {sighting.attributes.user["name"]}</Box><Divider /> </>}
            {sighting.attributes.missing_flyer != null &&<> <Box>Flyer: {sighting.attributes.missing_flyer["name"]}</Box><Divider /> </>}
            
            <Box>Description: {sighting.attributes.description}</Box>
            <Divider />
            </Box>
        </Flex>
    )
}

export default SightingCard