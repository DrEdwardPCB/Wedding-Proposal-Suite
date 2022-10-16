import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCheckpoint } from "../../apis/checkpoint";
import { User } from "../../components/common/entityInterface";
import { env } from "../../env";
import { RootType } from "../../redux/reducers/rootReducers";
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
        </div>
    );
};
