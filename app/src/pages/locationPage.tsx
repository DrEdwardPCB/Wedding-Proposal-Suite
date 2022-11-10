import { Box } from "native-base";
import { ScrollView, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadLocation } from "../redux/actions/locationAction";
import { AppApi } from "../utils/api/app";
import { RootType } from "../redux/reducers/rootReducer";
import { LocationViewer } from "../components/LocationViewer";
import { useIsFocused } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { isNil } from "lodash";
export const LocationPage = () => {
    const dispatch = useDispatch();
    const reload = async () => {
        try {
            const aa = await AppApi.getInstance();
            const response = await aa.getLocations();
            dispatch(reloadLocation(response.data.data));
        } catch (err) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "Failed",
                textBody: "an error has occured in reload",
            });
        }
    };
    const { locations, show } = useSelector(
        (state: RootType) => state.location
    );
    const isFocused = useIsFocused();
    const sv = useRef<ScrollView>(null);
    useEffect(() => {
        if (isFocused) {
            reload();
        }
        sv.current &&
            (sv.current as NonNullable<ScrollView>).scrollTo({ x: 0, y: 0 });
    }, [isFocused]);

    return (
        <ScrollView
            ref={sv}
            className='w-full h-full bg-blue-100'
            contentContainerStyle={{ display: "flex", alignItems: "stretch" }}>
            {Object.keys(show).some((e) => show[e]) ? (
                <></>
            ) : (
                <View className='p-12 m-12 border-2 rounded border-slate-300'>
                    <Text className='text-xl text-center'>
                        No Location Scanned, Please go to Check point and scan
                        location using camera
                    </Text>
                </View>
            )}
            {locations.map((e) => {
                if (isNil(show[e.id])) {
                    return <></>;
                } else if (show[e.id]) {
                    return (
                        <LocationViewer
                            key={e.id}
                            location={e}
                            displayDestinationPartial={true}
                            displayPasswordPartial={true}
                            displayNextLocation={true}></LocationViewer>
                    );
                } else {
                    return <></>;
                }
            })}
        </ScrollView>
    );
};
