import { get, isNil, upperFirst } from "lodash";
import { getEnv } from "../config/env";
import { Location } from "../utils/entityInterface";
import RenderHtml from "react-native-render-html";
import { IMapViewerPopups, MapViewer } from "./mapViewer";
import { View, Text, useWindowDimensions, Image } from "react-native";
// this component will be used for rendering single location

export interface ILocationViewerProp {
    location: Location;
    displayPasswordPartial: boolean;
    displayDestinationPartial: boolean;
    displayNextLocation: boolean;
}
export const LocationViewer = (props: ILocationViewerProp) => {
    const { width } = useWindowDimensions();
    const { location } = props;
    const name = location?.user?.loginName;
    const message = location?.message;
    const renderPhoto = (photoSrc: string) => {
        console.log(`${getEnv().BASE_API_URL}${photoSrc}`);
        if (!photoSrc) {
            return <></>;
        }
        return (
            <Image
                resizeMode='contain'
                className={`h-[150px] w-[100px] object-contain origin-center`}
                source={{ uri: `${getEnv().BASE_API_URL}${photoSrc}` }}></Image>
        );
    };
    const renderNextLocation = () => {
        if (location.next && props.displayNextLocation) {
            const loc = location.next;
            const lat = loc.location?.coordinates[0];
            const long = loc.location?.coordinates[1];
            return (
                <View className='p-4 my-4 border-2 rounded border-slate-400'>
                    <Text className='font-bold text-md'>
                        Next Location:{loc.locationDescription}
                    </Text>
                    <View className='w-full h-[500px]'>
                        <MapViewer
                            popups={[
                                {
                                    message: "",
                                    coordinate: [
                                        isNil(long) || isNaN(long)
                                            ? 114.1722
                                            : long,
                                        isNil(lat) || isNaN(lat) ? 22.295 : lat,
                                    ],
                                } as IMapViewerPopups,
                            ]}></MapViewer>
                    </View>
                </View>
            );
        } else {
            return <></>;
        }
    };
    const renderPasswordPartial = () => {
        if (location.passwordPartial && props.displayPasswordPartial) {
            return (
                <View className='p-4 my-2 border-2 rounded border-slate-400'>
                    <Text>
                        <Text className='font-bold text-md'>
                            Passcode Partial:{" "}
                        </Text>
                        {location.passwordPartial.message}
                    </Text>
                </View>
            );
        } else {
            return <></>;
        }
    };
    const renderDestinationPartial = () => {
        if (location.destinationPartial && props.displayDestinationPartial) {
            return (
                <View className='p-4 my-2 border-2 rounded border-slate-400'>
                    <Text>
                        <Text className='font-bold text-md'>
                            Destionation Partial:{" "}
                        </Text>
                        {location.destinationPartial.message}
                    </Text>
                </View>
            );
        } else {
            return <></>;
        }
    };
    return (
        <View className='p-4 m-4 border-2 rounded border-slate-400'>
            <View>
                <Text className='text-xl italic'>
                    from {isNil(name) ? "" : upperFirst(name)} -{" "}
                    {location.displayName}
                </Text>
            </View>
            <View>
                <Text className='font-bold text-md'>
                    Location Description:{" "}
                    {location?.locationDescription || "N/A"}
                </Text>
            </View>
            <View className='p-4 my-2 border-2 rounded border-slate-400'>
                <Text className='font-bold text-md:'> Messages</Text>
                {message ? (
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: message }}></RenderHtml>
                ) : (
                    <></>
                )}

                <View className='flex flex-wrap items-center justify-around gap-2 m-4'>
                    {location.photoone ? renderPhoto(location.photoone) : <></>}
                    {location.phototwo ? renderPhoto(location.phototwo) : <></>}
                    {location.photothree ? (
                        renderPhoto(location.photothree)
                    ) : (
                        <></>
                    )}
                </View>
            </View>
            <View>{renderDestinationPartial()}</View>
            <View>{renderPasswordPartial()}</View>
            <View>{renderNextLocation()}</View>
        </View>
    );
};

