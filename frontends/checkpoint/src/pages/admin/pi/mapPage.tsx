import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getLocations } from "../../../apis/admin";
import {
    IMapViewerPopups,
    MapViewer,
} from "../../../components/common/mapViewer";
import { RootType } from "../../../redux/reducers/rootReducers";
import { Location } from "../../../components/common/entityInterface";
import { isNil } from "lodash";
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
        return locations.map((e) => {
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
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            {/* part 1 showing the map */}
            <div className='w-full h-[500px]'>
                <MapViewer showlines={true} popups={popups ?? []}></MapViewer>
            </div>
            {/* part 2 showing details */}
            <div></div>
            {/* part 3 showing the passcode */}
            <div></div>
        </div>
    );
};
