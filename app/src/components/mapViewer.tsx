import { LatLngExpression } from "leaflet";
import { View } from "react-native";

import MapView, { Marker } from "react-native-maps";

export interface IMapViewerPopups {
    coordinate: LatLngExpression;
    message: string;
}
export interface IMapViewerProps {
    popups: IMapViewerPopups[];
}
export const MapViewer = (props: IMapViewerProps) => {
    const { popups } = props;

    const line: LatLngExpression[] = popups.map((e) =>
        //@ts-ignore
        e.coordinate.sort((a, b) => a - b)
    );
    // console.log(popups);
    // console.log(line);
    return (
        <View className='w-full h-full'>
            <MapView
                initialRegion={{
                    latitude: 22.2988,
                    longitude: 114.1722,
                    latitudeDelta: 0.03688,
                    longitudeDelta: 0.01684,
                }}
                style={{ height: "100%", width: "100%" }}>
                {popups.length > 0 ? (
                    popups.map((e, i) => {
                        return (
                            <Marker
                                key={i}
                                coordinate={{
                                    latitude:
                                        (e.coordinate as number[])[0] - 0.0008,
                                    longitude:
                                        (e.coordinate as number[])[1] + 0.0003,
                                }}
                                description={e.message}></Marker>
                        );
                    })
                ) : (
                    <></>
                )}
            </MapView>
        </View>
    );
};
