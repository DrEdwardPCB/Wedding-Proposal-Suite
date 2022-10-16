import { useSelector } from "react-redux";
import { RootType } from "../../redux/reducers/rootReducers";
import { useEffect, useRef, useState } from "react";

export const AdminHomePage = () => {
    const { user, token, isLoggedin } = useSelector(
        (state: RootType) => state.user
    );
    const [datestring, setDateString] = useState(new Date().toLocaleString());
    const interval = useRef<NodeJS.Timer | null>();
    useEffect(() => {
        interval.current = setInterval(() => {
            setDateString(new Date().toLocaleString());
        }, 1000);
        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        };
    }, []);

    return (
        <div className='flex flex-col w-5/6 ml-auto mr-auto grow min-w-[390px] overflow-auto'>
            <h2 className='text-2xl text-center'>Admin Home Page</h2>
            <p className='text-center'>Welcome {user?.loginName}</p>
            <p className='text-center'>{datestring}</p>
            <p className='text-center'>
                please proceed to the other route using the nav button above for
                CMS actions
            </p>
        </div>
    );
};
