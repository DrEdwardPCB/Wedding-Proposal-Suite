import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getCheckpoint } from "../../apis/checkpoint";
import { User } from "../../components/common/entityInterface";
import { env } from "../../env";
import { RootType } from "../../redux/reducers/rootReducers";
import { IMapViewerPopups } from "../../components/common/mapViewer";
import { MapViewer } from "../../components/common/mapViewer";
import { reverse, sortBy } from "lodash";
export const QRCodePage = () => {
    const { user, token, isLoggedin } = useSelector(
        (state: RootType) => state.user
    );
    const [checkpoint, setCheckpoint] = useState<Omit<User, "password"> | null>(
        null
    );
    useEffect(() => {
        reload();
    }, [user, token]);
    const reload = () => {
        fetchCheckpoint();
    };
    const fetchCheckpoint = async () => {
        const response = await getCheckpoint(token as string);
        const rawCheckpoint = response.data.data;
        setCheckpoint(rawCheckpoint);
    };
    const point = useMemo(() => {
        return {
            message: checkpoint?.location?.displayName,
            coordinate: checkpoint?.location?.location?.coordinates
                ? checkpoint.location.location.coordinates.sort((a, b) =>
                      a > b ? 1 : -1
                  )
                : [22.295, 114.1722],
        } as IMapViewerPopups;
    }, [checkpoint?.location]);
    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto items-center'>
            <h2 className='text-2xl text-center'>QRCode Page</h2>
            <p className='text-center'>display QRCode to app</p>
            {checkpoint && checkpoint.location ? (
                <QRCodeSVG
                    value={`${env.REACT_APP_DATAMGMT_BASEURL}/app/scan/${checkpoint.location.id}`}></QRCodeSVG>
            ) : (
                <div className='flex items-center justify-center w-full grow'>
                    <h1 className='text-2xl text-center'>
                        USER DOES NOT HAVE ASSOCIATED CHECKPOINT
                    </h1>
                </div>
            )}
            <div className='w-full h-[500px]'>
                <MapViewer showlines={false} popups={[point]}></MapViewer>
            </div>
        </div>
    );
};
