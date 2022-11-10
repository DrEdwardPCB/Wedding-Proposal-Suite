import { Box, ScrollView } from "native-base";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadLocation } from "../redux/actions/locationAction";
import { AppApi } from "../utils/api/app";
import { RootType } from "../redux/reducers/rootReducer";
import { LocationViewer } from "../components/LocationViewer";
export const LocationPage = () => {
    const dispatch = useDispatch();
    const reload = async () => {
        const aa = await AppApi.getInstance();
        const response = await aa.getLocations();
        dispatch(reloadLocation(response.data.data));
    };
    const { locations } = useSelector((state: RootType) => state.location);
    useEffect(() => {
        reload();
    }, []);
    return (
        <ScrollView
            h='100%'
            w='100%'
            maxWidth='100%'
            bg='blue.100'
            contentContainerStyle={{ display: "flex", alignItems: "stretch" }}>
            {locations.map((e) => {
                return (
                    <LocationViewer
                        key={e.id}
                        location={e}
                        displayDestinationPartial={true}
                        displayPasswordPartial={true}
                        displayNextLocation={true}></LocationViewer>
                );
            })}
        </ScrollView>
    );
};
