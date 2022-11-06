import { Box, Container } from "native-base";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reloadLocation } from "../redux/actions/locationAction";
import { AppApi } from "../utils/api/app";
export const LocationPage = () => {
    const dispatch = useDispatch();
    const reload = async () => {
        const aa = await AppApi.getInstance();
        const response = await aa.getLocations();
        dispatch(reloadLocation(response.data.data));
    };
    useEffect(() => {
        reload();
    }, []);
    return (
        <Container h='100%' w='100%' maxWidth='100%' bg='blue.100'>
            <Box bg='primary.400' p='12' rounded='lg'>
                Location Page
            </Box>
        </Container>
    );
};
