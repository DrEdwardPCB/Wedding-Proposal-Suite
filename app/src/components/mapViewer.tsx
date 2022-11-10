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
        <View className='w-full h-1/2'>
            <MapView
                initialRegion={{
                    latitude: 22.2988,
                    longitude: 114.1722,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{ height: "100%", width: "100%" }}>
                {popups.length > 0 ? (
                    popups.map((e, i) => {
                        return (
                            <Marker
                                key={i}
                                coordinate={{
                                    latitude: (e.coordinate as number[])[0],
                                    longitude: (e.coordinate as number[])[1],
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
