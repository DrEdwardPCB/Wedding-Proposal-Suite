import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getLocations } from "../../../apis/admin";
import {
    IMapViewerPopups,
    MapViewer,
} from "../../../components/common/mapViewer";
import { RootType } from "../../../redux/reducers/rootReducers";
import { Location } from "../../../components/common/entityInterface";
import { cloneDeep, isNil } from "lodash";
import { LocationViewer } from "../../../components/admin/pi/locationViewer";
export const PiMapPage = () => {
    const { token } = useSelector((state: RootType) => state.user);
    const [locations, setLocation] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const fetchLocation = async () => {
        const response = await getLocations(token as string);
        const rawLocationList = response.data.data;
        console.log(rawLocationList);
        setLocation(rawLocationList);
    };
    function reload() {
        fetchLocation();
    }
    useEffect(() => {
        reload();
    }, []);
    const popups = useMemo(() => {
        //arrange locations as next
        const sortedLocations: Location[] = [];
        const initial = locations.find((e) => !isNil(e.next) && isNil(e.prev));
        if (initial) {
            sortedLocations.push(initial);
            let currLoc = locations.find(
                (e) => e.id == (initial.next as NonNullable<Location>).id
            );
            while (true) {
                if (currLoc) {
                    sortedLocations.push(cloneDeep(currLoc));
                    if (currLoc.next) {
                        let nextLoc = locations.find(
                            (e) =>
                                e.id ===
                                (
                                    (currLoc as NonNullable<Location>)
                                        .next as NonNullable<Location>
                                ).id
                        );

                        currLoc = nextLoc;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        console.log(sortedLocations);

        return sortedLocations.map((e) => {
            const lat = e.location?.coordinates[0];
            const long = e.location?.coordinates[1];
            return {
                message: e.scanTime || "not scanned",
                coordinate: [
                    isNil(long) || isNaN(long) ? 114.1722 : long,
                    isNil(lat) || isNaN(lat) ? 22.295 : lat,
                ],
            } as IMapViewerPopups;
        });
    }, [locations]);
    console.log(popups);

    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto mb-[100px]'>
            {/* part 1 showing the map */}
            <div className='w-full h-[500px]'>
                <MapViewer showlines={true} popups={popups ?? []}></MapViewer>
            </div>
            {/* part 2 showing details */}
            <div>
                {locations.map((e) => (
                    <LocationViewer
                        key={e.id}
                        location={e}
                        displayDestinationPartial={true}
                        displayPasswordPartial={true}
                        displayNextLocation={false}></LocationViewer>
                ))}
            </div>
            {/* part 3 showing the passcode */}
            <div></div>
        </div>
    );
};
