import { LatLngExpression } from "leaflet";
import L from "leaflet";
//@ts-ignore
import icon from "leaflet/dist/images/marker-icon.png";
//@ts-ignore
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from "react-leaflet";
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
export interface IMapViewerPopups {
    coordinate: LatLngExpression;
    message: string;
}
export interface IMapViewerProps {
    popups: IMapViewerPopups[];
    center?: LatLngExpression;
    showlines: boolean;
}
export const MapViewer = (props: IMapViewerProps) => {
    const { center = [22.295, 114.1722], popups, showlines } = props;
    //@ts-ignore
    const line: LatLngExpression[] = popups.map((e) => e.coordinate.reverse());
    console.log(popups);
    console.log(line);
    return (
        <div className='w-full h-full'>
            <MapContainer
                center={center}
                zoom={16}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={popups[0].coordinate}>
                    <Popup>{popups[0].message}</Popup>
                </Marker>
                {popups.map((e, i) => {
                    return (
                        <Marker key={i} position={e.coordinate}>
                            <Popup>{e.message}</Popup>
                        </Marker>
                    );
                })}
                {showlines && (
                    <Polyline
                        pathOptions={{ color: "blue" }}
                        positions={line}
                    />
                )}
            </MapContainer>
        </div>
    );
};
